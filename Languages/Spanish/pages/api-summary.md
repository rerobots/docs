---
title: API Summary
---

# Resumen de la API

{% alerta %}
Esta API es inestable. Si está desarrollando con él, [contáctenos] (https://rerobots.net/contact) primero.
{% /alerta %}

La mayoría de los usuarios querrán usar una de las bibliotecas de clientes oficiales en lugar de
trabajando directamente con la interfaz HTTP:

*Python -<https://pypi.org/project/rerobots/>
*Óxido -<https://crates.io/crates/rerobots>

La versión actual es 1, por lo que llama a api.rerobots.net que carecen de una ruta de versión
por defecto a v1. Para solicitar esta o cualquier versión en particular, en las solicitudes incluya una
Encabezado `Aceptar`, por ejemplo,

```http
application/vnd.rerobots.v1+json
```

La respuesta incluye encabezados relacionados con la limitación de velocidad:

```http
X-RateLimit-Límite: N
X-RateLimit-Remaining: M
X-RateLimit-Reset: T
```

donde T es segundos desde The Epoch, y es invariante que M < N. (No puede
ser que M = N porque el encabezado de respuesta se envía si y solo si una solicitud fue
hecho.) En el futuro podemos modificar esto para no contar algunas solicitudes contra el
límite, por ejemplo, si se requiere una redirección. Cada solicitud subsiguiente causará
`X-RateLimit-Remaining` se reducirá hasta que llegue a `0`, después de lo cual
no se aceptarán más solicitudes hasta que pase la hora actual `T`.


## Autenticación

{% alerta %}
La autenticación aún no está disponible a través de la API HTTP. En su lugar, [Obtenga tokens de API a través de la interfaz de usuario web] (https://rerobots.net/tokens).
([Lea las instrucciones sobre cómo hacerlo.](/webui/making-and-revoking-api-tokens))
{% /alerta %}

## Commands

### GET /

lista resumen de los comandos disponibles en esta versión de la API HTTP

### GET /workspaces

enumere los tipos de espacios de trabajo conocidos. Tenga en cuenta que esta lista es independiente de cuál
las implementaciones existen actualmente o están disponibles para su uso.


### POST /revoke/:SHA256-of-token

Revocar el token de API que pertenece al usuario y tiene un hash SHA256 igual a la segunda parte
de la ruta

Se puede usar un token de API válido para revocarse a sí mismo.


### POST /purge

Elimine todos los tokens de autenticación (API) asociados con el usuario. Para hacer esto, el
par de usuario y contraseña o un token existente de capacidades suficientes debe ser
proporcionó. Si se proporcionan ambos, solo se comprueba el par de usuario y contraseña.


### GET /deployments{/workspace_type}

Obtenga una lista de todas las implementaciones o implementaciones de un tipo de espacio de trabajo específico. Nota
que los tipos de espacios de trabajo actualmente disponibles se pueden obtener mediante `GET /workspaces`.
Esto admite una paginación que es completamente similar a la de `GET /instances`.

Los parámetros de consulta opcionales son los siguientes:

*`q`: consulta de búsqueda

*`maxlen`: entero no negativo tal que el tamaño de la cola de uso es como máximo `maxlen`, o (predeterminado) `"u"` para solicitar sin límite, es decir, sin restricción de longitud.
*`types`: lista de tipos de espacios de trabajo deseados, o (predeterminado) si está vacío o no se proporciona, entonces incluya todos los tipos. Si la solicitud contiene una lista de `tipos` y también el sufijo de destino `/workspace_type` (es decir, la solicitud tiene la forma `GET /deployments/workspace_type`), entonces solo se usa la lista de `tipos`.

*`ordenar_por`: uno de
    -`inc_wtype`: (predeterminado) tipo de espacio de trabajo en orden alfabético
    -`dec_wtype`: orden alfabético inverso, "Z" antes de "A"
-`inc_created`: fecha creciente de creación; los más viejos primero
    -`dec_created`: fecha decreciente de creación; Lo mas reciente primero
    -`inc_count`: aumento del número total de instancias completadas
    -`dec_count`: número total decreciente de instanciaciones completadas


### GET /deployment/:deploymentID

Obtenga información sobre la implementación del espacio de trabajo. La respuesta es un objeto JSON con algunos
o todo lo siguiente:

*`id`: identificador único global para la implementación del espacio de trabajo.
*`type`: tipo de espacio de trabajo.
*`region`: ubicación física de este despliegue.
*`icounter`: número total de instanciaciones completadas.
*`created`: fecha de creación; excepto donde se indique lo contrario, el hardware en esta implementación de espacio de trabajo es al menos tan antiguo como esta fecha, pero no mucho más antiguo que esa fecha.
*`queuelen`: longitud de la cola de uso (igual que desde `GET /queuelen/:deploymentID`). Este es un límite superior en la cantidad de usuarios que tienen prioridad para acceder a esta implementación de espacio de trabajo. Es un límite superior porque las reservas se pueden cancelar voluntariamente y porque `queuelen` cuenta las reservas que son para el primero disponible de un tipo de espacio de trabajo, que eventualmente se puede satisfacer con una implementación diferente.


### GET /queuelen/:deploymentID

Obtenga la longitud de la cola de uso para la implementación de un espacio de trabajo. La *longitud*está definida
como 0 si la implementación no se está utilizando actualmente y si no hay
reserva que le corresponde. De lo contrario, 1+N, donde N es el número de
reservas que le correspondan. Debido a que una reserva puede aplicarse a (y por lo tanto, ser
satisfecho por) más de una implementación de espacio de trabajo, N es un límite superior.

Si no se reconoce el ID de implementación, se muestra el código de estado 404 (No encontrado).
devuelto
Tenga en cuenta que una solicitud posterior de una instancia de esta implementación de espacio de trabajo puede
no tuvo éxito, a pesar de recibir 0 de longitud en la respuesta anterior. esto es simplemente
una cuestión de condiciones de carrera con otros usuarios potenciales.


### GET /firewall/:instanceID

Obtenga una lista ordenada de reglas de firewall para la instancia del espacio de trabajo. Siguiendo el
convención de iptables de Linux, la primera regla que un paquete entrante coincide
decide el resultado.

La respuesta está en JSON. El campo principal es `rules`; es una lista de `(fuente,
acción)`pares, o si la cadena correspondiente aún no se ha creado, `none`.


### DELETE /firewall/:instanceID

CAprenda todas las reglas de firewall para la instancia del espacio de trabajo. El comportamiento predeterminado es soltar
todos los mensajes entrantes, que es por lo tanto la consecuencia de este comando. Usar
`POST /firewall/:instanceID` con un cuerpo vacío (es decir, sin carga JSON) para
permitir paquetes entrantes del emisor de la solicitud `POST`.


### POST /firewall/:instanceID

AAgregue reglas de firewall a la cadena existente para la instancia del espacio de trabajo. La carga útil es un
Objeto JSON con uno o más de los siguientes:

*src: dirección de origen using [CIDR notation](https://tools.ietf.org/html/rfc4632)
  for IPv4 addresses. Default (i.e., if this option is not declared) is `A/32`,
  where `A` is the address from which this request arrived.

* ación: una de `"ACCEPT"`, `"DROP"`, `"REJECT"`. Estos tienen lo habitual
  interpretación, por ejemplo, como en Linux [iptables](https://www.netfilter.org/).
  El valor predeterminado es `ACCEPT`.


### POST /new/{:workspace_type,:deploymentID}

Rsolicitar nueva instancia. Las opciones se describen a continuación. Actualmente los únicos niveles de
especificidad son el tipo de espacio de trabajo o el ID de implementación. Si se proporciona un tipo de espacio de trabajo,
luego se selecciona una implementación adecuada dependiendo de la disponibilidad: si hay una
inmediatamente disponible, luego se usa; de lo contrario, uno con una longitud de cola mínima
es seleccionado. Si se proporciona un ID de implementación, se utiliza esa implementación.

La carga útil opcional es un objeto JSON con algunos o todos los siguientes:
*`sshkey`: clave pública para usar en el acceso de la instancia a través de SSH. la cuenta de usuario
  el nombre en las instancias es `root`.

*`vpn`: (predeterminado `false`) proporciona acceso a través de VPN.

*`reserved`: si es `false` (predeterminado), entonces no crear una reserva si un
  la instancia no se puede crear todavía.

*`eurl`: si se crea una reserva, envíe una solicitud POST a esta URL cuando
  la reserva se convierte en instancia o está lista para hacerlo.

La respuesta es un objeto JSON con algunos o todos los siguientes:

* `success`: `true` si y solo si la nueva instancia se creó con éxito.
  De lo contrario, la mayoría de los demás datos que se describen a continuación no estarán presentes en la respuesta.
  porque pertenecen a instancias recién creadas. Si `success: false` y un
  se creó la reserva, entonces el identificador de la reserva está en`id`.(Puede
  también se puede obtener utilizando `GET /reservations`.)

* `id`: identificador único global para la instancia o reserva creada.

*`sshkey`: clave privada para usar en el acceso de la instancia a través de SSH. Si la llave púbica
  se proporcionó en la solicitud original, entonces este elemento no estará en la respuesta
  porque se supone que el usuario ya tiene la clave privada correspondiente a
  la clave pública que proporcionaron.

Tenga en cuenta que `success: true` en la respuesta no implica que la instancia haya
inicialización finalizada. Por ejemplo, crear una nueva VPN puede requerir 30 o más
segundos, por lo que las solicitudes de credenciales de nuevos clientes (`POST /vpn/:instanceID`) no lo haré
pero tener éxito.

Para obtener el estado actual de la instancia, incluso si está lista para usar,
controlar `GET /instance/:instanceID`.


### POST /terminate/:instanceID

Terminar (finalizar) la ejecución de una instancia. La instancia no se puede volver a utilizar si
este comando tiene éxito.


### GET /instances

Get lista de todas las instancias activas que fueron creadas por el usuario. Este comando
requiere autenticación, y el`user` clave del JWT determina qué
se muestran las instancias.

Las claves de consulta opcionales son las siguientes:

* `include_terminated`: si aparece esta tecla, la respuesta incluirá
  Instancias terminadas que fueron creadas originalmente por el usuario. (Algún valor
  proporcionada para la clave será ignorada.)

* `sort_by`: uno de
    - `dec_start_date`: (predeterminado) fecha de inicio decreciente; Lo mas reciente primero
    - `inc_start_date`: aumento de la fecha de inicio; los más viejos primero

* `max_per_page`: if `0` (predeterminado), luego coloque todos los elementos en una sola página, es decir, la lista completa de elementos aparecerá en la misma respuesta. de lo contrario (si `max_per_page` > 0),luego los artículos se ordenan de acuerdo a `sort_by` y la lista en la respuesta actual depende de la `page` opción (el valor predeterminado es `1`, i.e., primera página).

* `page`: el número de página para obtener. el valor predeterminado es `1`. si el valor dado es mayor que el número total de páginas, equivale a ser el último número de página.

La respuesta contiene:

* `workspace_instances`:lista de identificadores de instancia.

*`page_count`: el número total de páginas. la respuesta incluye todos los elementos si y solo si `page_count == 1`.


### GET /instance/:instanceID

Obtenga información sobre la instancia del espacio de trabajo a la que el usuario tiene acceso de lectura.
La respuesta es un objeto JSON con algunos o todos los siguientes:

* `id`: identificador único global para la instancia creada.
* `deployment`: identificador para la implementación del espacio de trabajo correspondiente.
* `type`: tipo de espacio de trabajo.
* `region`:ubicación física de esta instancia (igual que la implementación).
* `status`: La instancia solo se puede usar cuando el estado es`"READY"`.
* `vpn`: si hay una VPN asociada con esta instancia, tiene el mismo contenido que la respuesta de `GET /vpn/:instanceID`. De lo contrario, este elemento no se incluye en la respuesta.
* `fwd`: reenvío de puertos a través de un túnel SSH; detalles de conexión:

    * `ipv4`:dirección IPv4 externa de esta instancia. Tenga en cuenta que las reglas de firewall asociadas con esta instancia (por lo tanto, esta dirección) se pueden revisar usando `GET /firewall/:instanceID`.
    * `port`: puerto externo de esta instancia.
* `hostkeys`: lista de claves de host ssh para todos los hosts a los que el usuario tendrá acceso como parte de esta instancia.
*`starttime`: marca de tiempo de cuando se inició la instancia.
* `endtime`: marca de tiempo de cuando se detuvo la instancia, es decir, se terminó; este elemento no se proporciona si aún no hay una hora de finalización, por ejemplo, si el estado es`"ready"`.


### GET /vpn/:instanceID

Obtenga detalles sobre la VPN asociada con esta instancia, si hay
una. La respuesta es un objeto JSON con algunos o todos los siguientes:

* `clients`: lista de identificadores de todos los clientes actuales, incluidos los del espacio de trabajo.
* `status`: uno de los siguientes{`"preparing"`, `"ready"`, `"nil"`}.

Si no hay una VPN para esta instancia (pero la instancia existe), entonces
la respuesta es

```json
{"status": "nil"}
```

### POST /vpn/:instanceID

Obtenga credenciales para que un nuevo cliente se una a la VPN asociada con este
instancia. La respuesta tiene dos partes:

* `client_id`: identificador único para hacer referencia a estas credenciales en otras solicitudes.
* `ovpn`: contenido de un archivo OVPN que se puede usar para conectarse a través de [OpenVPN](https://openvpn.net/).


### GET /reservations

Obtener lista de reservas activas asociadas a la cuenta del usuario.

La respuesta es un objeto JSON con:

* `reservations`: lista de reservas.

Cada elemento de la lista `reservations` es un objeto JSON con:

* `id`: identificador único global para la reserva.
* `created`: fecha (hora) en que se creó la reserva.
* `desc`: descripción de lo que está reservado: por ejemplo,`type basic_kobuki` O
  `deployment 909cbe2d-eb85-4b8c-9a76-e7bffe880152`.


### DELETE /reservation/:reservationID

Eliminar una reserva. Este proceso no se puede deshacer. En particular, cualquier progreso
hacia el uso de una de las implementaciones de espacio de trabajo coincidentes se perderá.


### POST /ci/new

Inicie una nueva compilación de CI. Los datos del cuerpo en la solicitud deben ser JSON que contengan:

*`ns`: espacio de nombres, también conocido como proyecto al que pertenece esta compilación.
*`repo_type`: actualmente, debe ser `git`.
*uno de `repo_branch`, `repo_commit`, que tienen un significado análogo a `TRAVIS_BRANCH`, etc., como se define en https://docs.travis-ci.com/user/environment-variables#Default-Environment-Variables
*`repo_url`: URL desde la que obtener el repositorio
*`repo_branch`: rama del repositorio a pagar