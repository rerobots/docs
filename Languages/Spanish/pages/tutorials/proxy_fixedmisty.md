---
title: Prueba la API de Misty con un proxy
image: /tutorials/figures/smaller-tutorial_proxy_fixedmisty_finalarrange.png
---

# Prueba la API de Misty con un proxy

## Resumen

En este tutorial, se le muestra cómo instanciar un espacio de trabajo con un robot Misty
(por ejemplo, [`fixed_misty2`](/workspaces/fixed_misty2)) para controlar el robot a través del
[Centro de Comando Brumoso](http://sdk.mistyrobotics.com/command-center/index.html), hacer directamente
[API REST brumosa](https://docs.mistyrobotics.com/misty-ii/web-api/overview/)llamadas
a través de un proxy seguro. (Tenga en cuenta que el Misty Command Center es un producto de[Misty
Robotics](https://www.mistyrobotics.com/), Inc., y NO FORMA PARTE DE rerobots.)

Si cree que falta algo o si encuentra errores, [comuníquese con
nosotros](https://rerobots.net/contact) o [abrir un ticket](
https://github.com/rerobots/docs/issues).

## Buscando

Para comenzar, inicie sesión en <https://rerobots.net>, e ir a [la búsqueda
página](https://rerobots.net/search). Debería verse como lo siguiente:

![captura de pantalla de la página de búsqueda](figures/proxy_fixedmisty_search.png)

Para este tutorial, queremos usar una implementación de espacio de trabajo que tenga el tipo
[`fixed_misty2`](/workspaces/fixed_misty2). si uno no es
already listed, enter "misty" into the search field, or try the following URL:
<https://rerobots.net/search?q=fixed_misty2>
Haga clic en la foto o en la "identificación de implementación" de uno de los elementos en la búsqueda
resultados. Obtendrá una breve descripción del espacio de trabajo, que debe verse
como el siguiente:

![captura de pantalla del resumen de implementación del espacio de trabajo](figures/proxy_fixedmisty_wddetails.png)

## Solicitando una instancia

Para solicitar el uso de la implementación del espacio de trabajo que está viendo, haga clic en el
botón "Solicitar instancia". La siguiente página proporciona algunas opciones sobre el
instancia que va a crear. Debería verse como:

![captura de pantalla de la página para crear una nueva instancia](figures/proxy_fixedmisty_newinstance.png)

Si encuentra alguna dificultad aquí, por favor [contáctenos](
https://rerobots.net/contact).

Si se acepta su solicitud, será redirigido a una página que muestra
todas sus instancias activas. Observe que hay un mensaje en la parte superior de la página:

> ¡Tu nueva instancia de espacio de trabajo se está inicializando! Porque no usaste una clave SSH
> que ya está asociado a su cuenta de usuario, se generó un nuevo par de claves
> para esta instancia. El siguiente enlace se puede utilizar para descargar la clave privada
> precisamente una vez.
Cuando esté listo, seleccione el enlace "Descargar clave privada", que descargará
un archivo llamado`key.pem`.Tenga cuidado de hacer clic en el enlace solo cuando esté listo para
La descarga. Si aún no está listo, ignore el mensaje. La misma URL es
enumerados más adelante en el panel de "alertas".

## Iniciando el proxy Misty

[Vaya a su lista de instancias de rerobots.](https://rerobots.net/instances) Allí
debería ser un `fixed_misty2` instancia que acaba de crear. Después de varios
minutos de inicialización, durante los cuales el robot y otras partes del espacio de trabajo
están preparados, el estado de la instancia será `READY`. Selecciónelo de la lista para
obtener detalles de la instancia, lo que da como resultado una página como la siguiente:

![captura de pantalla de la página de detalles de la instancia](figures/proxy_fixedmisty_instancedetails.png)

En el panel titulado "Misty robot proxy", seleccione el enlace "iniciar proxy". Este
iniciará un servidor proxy a través del cual puede realizar llamadas API de forma remota en el
Robot brumoso.

![captura de pantalla del panel proxy de Misty](figures/proxy_fixedmisty_proxypanel.png)

En este ejemplo, copiarías y pegarías la primera dirección
(`proxy.rerobots.net:32912/61ab371e4`...) en el cuadro "Dirección IP del robot" en
<http://sdk.mistyrobotics.com/command-center/>.

Para ver el robot, seleccione el enlace "iniciar transmisión de cámara" en el panel titulado
"secuencias de cámara". Esto iniciará la transmisión de la cámara y generará una URL para
viéndolo

Busque el enlace con el texto "abrir flujo de cámara". Abrir este enlace en un navegador nuevo
ventana. Intente colocar la ventana de transmisión de la cámara en un lado de su escritorio y
la ventana Misty Command Center en el otro lado, como se muestra en esta captura de pantalla:
![captura de pantalla de la transmisión de la cámara y Misty API Explorer
lado a lado](figures/proxy_fixedmisty_finalarrange.png)

Un arreglo similar se muestra en [el siguiente video](https://vimeo.com/440801712):

{% vimeo id="440801712" /%}


## El caso general

El complemento `mistyproxy` proporciona otro prefijo de URL que tiene el esquema HTTPS
y proporciona una conexión segura desde su computadora al robot Misty. (Él
El sitio web de Explorer solo acepta HTTP). Si está desarrollando su propio código, entonces
deberías usar este.

Por ejemplo, si el prefijo de URL es
`https://proxy.rerobots.net/2c748d9af25319fcb5ee5dea70400c9f4fbb8e71a5c2b31cde7ee85838b1db09/mistyproxy/c9ab91885e059d56263e514a6812b9d4a2e2b2ef71fdcb13651da9bc2e6064b3`,
entonces puedes hacer [API Misty](
https://docs.mistyrobotics.com/misty-ii/web-api/overview/) llamadas desde el
línea de comandos con [cURL](https://curl.haxx.se/):

```bash
export MISTYPREFIX=https://proxy.rerobots.net/2c748d9af25319fcb5ee5dea70400c9f4fbb8e71a5c2b31cde7ee85838b1db09/mistyproxy/c9ab91885e059d56263e514a6812b9d4a2e2b2ef71fdcb13651da9bc2e6064b3

curl $MISTYPREFIX/api/device
```

which demuestra [GET /api/device](
https://docs.mistyrobotics.com/misty-ii/web-api/api-reference/#getdeviceinformation). aviso
que guardamos el prefijo de URL en la variable de shell `$MISTYPREFIX`, lo que hace
el comando `curl` conciso.


## Conclusión

Cuando haya terminado, regrese a <https://rerobots.net/instances>, busque la instancia
que creó en la tabla y presione el botón `terminar`.