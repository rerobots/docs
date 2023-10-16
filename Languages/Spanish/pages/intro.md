---
title: Introducción
---

# Introducción

## Resumen

Esta página presenta los principales conceptos y partes de los rerobots.

## Espacios de trabajo

Un **espacio de trabajo**es una colección de métodos y materiales para
experimentos con hardware. Tenga en cuenta que "experimentos" no es solo para conocimientos básicos o aplicados.
investigación, pero también es para actividades rutinarias de ingeniería como
Pruebas de {% abbr title="integración continua" %}CI{% /abbr %}.

Conceptualmente, hay tres niveles de refinamiento. Un **tipo de espacio de trabajo**es el
espacio de trabajo en términos de características esenciales, como los modelos de hardware y el
número de robots. Una **implementación**de un tipo de espacio de trabajo es una
realización, donde los parámetros del tipo toman valores particulares como IP
dirección o marca de un telémetro.
Este término se escribe de forma más concisa como *implementación del espacio de trabajo*o *wdeployment*.

Una **instancia**de un espacio de trabajo corresponde al uso de una implementación por parte de un
usuario. Idealmente, cada instancia de una implementación tiene cambios de módulo idénticos de
parámetros definidos por el usuario cuando estén disponibles, pero en la práctica puede haber pequeños
diferencias

## Instancias

El ciclo de vida de la instancia se muestra en el siguiente diagrama:

![diagrama del ciclo de vida de la instancia](figures/instance-lifecycle.svg)

La creación de instancias siempre comienza en `INIT`. Es raro pero posible que un error
ocurrirá durante `INIT` que hace que la instancia se marque como `INIT_FAIL`.
Si la inicialización tiene éxito, la instancia se vuelve "LISTA" y el tiempo de uso
comienza la medición para fines como la facturación. Cuando el usuario haya terminado, puede
terminar la instancia.

En el caso de `INIT_FAIL`, puede [contactar a un rerobots
empleado](https://rerobots.net/contact) para obtener ayuda, o puede intentar
iniciar una nueva instancia de nuevo. El registro interno de los robots
guarda automáticamente este evento para una mayor investigación más adelante.

## Tipos de conexión

Para conectarse a una instancia, ahora hay varias opciones disponibles, y hay más
en desarrollo. La mejor elección depende de una variedad de factores, incluyendo
algunos que los rerobots no pueden controlar; por ejemplo, su ubicación geográfica relativa a
implementaciones de espacios de trabajo, si operará los robots de forma interactiva
(en tiempo real) o cargar pruebas y ejecutarlas por lotes, el tipo de comunicaciones
middleware que utiliza en los robots.

Tipos de conexión disponibles:

1. `sshtun`: ssh a una dirección IP pública y número de puerto.
2. `openvpn`: cree un servidor OpenVPN e instale certificados de cliente en los hosts de instancia.

## Fichas API

Además de la interfaz de usuario web (WebUI), rerobots tiene una
{% abbr title="interfaz de programación de aplicaciones" %}[API](/api-summary){% /abbr %}.
Un **token API**es una cadena que proporciona
autenticación y autorización para solicitudes de API. Siguen los tokens API de rerobots
el estándar JSON Web Token, [RFC 7519](https://tools.ietf.org/html/rfc7519),
que se presenta en <https://jwt.io/>.
Los usuarios administran sus tokens de API en <https://rerobots.net/tokens>.
Obtenga más información leyendo las [guías](/guías) sobre tokens API,
como [cómo crear y revocar tokens API](/webui/hacer-y-revocar-tokens-api).

## Compartir

La parte de rerobots que facilita a los usuarios compartir su propio hardware con
otros se llama **hardshare**. Estos espacios de trabajo están disponibles a través de la misma
interfaces como robots que son mantenidos por rerobots la empresa.
Sin embargo, propiedades como el tiempo de actividad y la calibración dependen de los propietarios.
El propietario decide a quién se le permite acceder a su hardware y cómo
Las características adicionales como VNC deberían funcionar en su caso específico.
En la práctica, esto no es un problema porque los usuarios y propietarios de los dispositivos
a través de hardshare son típicamente confiables.

En rerobots, los dispositivos compartidos a través de hardshare siempre reciben el espacio de trabajo
escriba [usuario_provisto](/workspaces/user_provided). Cada espacio de trabajo con otro tipo
que `user_provided` es mantenido profesionalmente por rerobots, por ejemplo,
[fixed_misty2](/workspaces/fixed_misty2).

Si está interesado en compartir su hardware,
lea la [Introducción al manual de hardshare](https://docs.hardshare.dev/intro.html).
El código fuente del cliente de hardshare está en <https://github.com/rerobots/hardshare>.