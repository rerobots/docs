# Instancia basada en VPN con ROS y Brunel Hand

## Resumen

En este tutorial, se le muestra cómo crear una instancia de un espacio de trabajo que tiene un Brunel
Mano y que se accede a través de VPN. Si quieres ver un video de ejemplo que
puede reproducir, salte a la sección [Movimiento de comando](#movimiento-de-comando).

Si cree que falta algo o si encuentra errores, [comuníquese con
us](https://rerobots.net/contact) o [abrir un
boleto] (https://github.com/rerobots/docs/issues).

## Buscando
Para comenzar, inicie sesión en <https://rerobots.net> y vaya a [la búsqueda
página](https://rerobots.net/search). Debería verse como lo siguiente:

![captura de pantalla de la página de búsqueda](figures/vpn_brunelhand_search.png)

Para este tutorial, queremos usar una implementación de espacio de trabajo que tenga el tipo
[`fixed_brunelhand`](/workspaces/fixed_brunelhand.html). Si uno no está ya en la lista, ingrese "brunel" en la búsqueda
o pruebe con la siguiente URL: <https://rerobots.net/search?q=fixed_brunelhand>
Haga clic en la foto o en la "identificación de implementación" de uno de los elementos en la búsqueda
resultados. Obtendrá una breve descripción del espacio de trabajo, que debe verse
como el siguiente:

![captura de pantalla del resumen de implementación del espacio de trabajo](figures/vpn_brunelhand_wdeployment_summary.png)

## Solicitando una instancia

Para solicitar el uso de la implementación del espacio de trabajo que está viendo, haga clic en el
botón "Solicitar instancia". La siguiente página proporciona algunas opciones sobre el
instancia que va a crear. Debería verse como:
![captura de pantalla de la página para crear una nueva instancia](figures/vpn_brunelhand_new_instance_dialog.png)

En "tipo de conexión", seleccione "VPN". Entonces, solicítalo. Un sistema de reservas
está en desarrollo, por lo que su solicitud podría ser denegada si alguien más comenzó a
utilizar el mismo espacio de trabajo. Si encuentra alguna dificultad aquí, por favor [comuníquese
nosotros](https://rerobots.net/contact).

Si se acepta su solicitud, será redirigido a una página que muestra
todas sus instancias activas. Observe que hay un mensaje en la parte superior de la página:

> ¡Tu nueva instancia de espacio de trabajo se está inicializando! Porque no usaste una clave SSH
> que ya está asociado a su cuenta de usuario, se generó un nuevo par de claves
> para esta instancia. El siguiente enlace se puede utilizar para descargar la clave privada
> precisamente una vez.

Cuando esté listo, seleccione el enlace "Descargar clave privada", que descargará
un archivo llamado `key.pem`. Tenga cuidado de hacer clic en el enlace solo cuando esté listo para
La descarga.

En la tabla de tus instancias, encontrarás la que acabas de crear. Su
el estado debe ser `INIT`, lo que indica que se está inicializando. Si selecciona
entonces se mostrarán detalles similares a los siguientes:

![texto de estado de una instancia de inicialización](figures/vpn_brunelhand_instance_init.png)

Crear un nuevo servidor VPN para su instancia puede requerir hasta 12 minutos, más
o menos, porque el proceso de generación de certificados y claves es lento. Por lo tanto,
considere tomar un descanso de 10 minutos antes de hacer clic en `actualizar`
botón. Eventualmente, el resultado debería ser `READY` o `INIT_FAIL`. Si lo consigues
`INIT_FAIL`, luego algo se rompió durante la inicialización. En este caso, puede
`terminar` la instancia y repetir los primeros pasos de este tutorial, o [contactar
us](https://rerobots.net/contact) para obtener ayuda. Gracias por su paciencia mientras intentamos
para hacer más robusto el servicio de rerobots.
Si obtiene `LISTO`, ¡entonces la instancia del espacio de trabajo está lista para usted!

## Tu primer inicio de sesión

Ahora que la instancia del espacio de trabajo tiene el estado "LISTO", busque la sección
"VPN" en la página y haga clic en el botón "agregar nuevo cliente". La respuesta podría ser
lento (aprox. 10 segundos). Cuando se complete, habrá una nueva entrada en la lista.
de "identificadores de cliente" con un enlace de "descarga única". Me gusta la URL de tu
Clave SSH, esto se puede usar precisamente una vez. Cuando esté listo, seleccione "descarga única"
para obtener un archivo OVPN. Si algo sale mal, intente "agregar nuevo cliente"
de nuevo. (Puede generar credenciales de VPN para tantos clientes como desee).

![texto de estado de la instancia preparada](figures/vpn_brunelhand_instance_ready.png)

Importe el archivo OVPN a su software de cliente VPN. Contiene cliente
credenciales con las que puede conectarse a la VPN de su instancia, es decir, una CA
certificado, un certificado de usuario y una clave privada de usuario, junto con el servidor VPN
detalles. Los detalles dependen de su computadora. Si tiene Mac OS, intente
[Tunnelblick](https://tunnelblick.net/). Si usted tiene
[Fedora](https://getfedora.org/) o [Ubuntu](https://www.ubuntu.com/), entonces su
El panel de control de la red debe tener una opción para conectarse a una VPN. Además de estos
herramientas gráficas, puede utilizar [openvpn](https://community.openvpn.net/)
programa de línea de comandos. En Linux, el comando sería como: `openvpn
cliente.ovpn`.
En muchos casos, la configuración predeterminada es enrutar *todo*el tráfico de red
a través de la VPN de su instancia. Si solo desea enrutar paquetes a través de él
que involucran hosts específicos de VPN, es posible que deba tomar algunas medidas adicionales
acción que depende de su software de cliente. Por ejemplo, en la red GNOME
herramienta de configuración en Fedora, hay una pestaña para "IPv4" en el cuadro de diálogo "Agregar VPN",
donde puede marcar una casilla junto a "Usar esta conexión solo para recursos en su
la red".
Cuando esté conectado a la VPN, abra una terminal e intente

```bash
ping rrc.local
```

Posiblemente, después de un poco de retraso, debería obtener pings exitosos. `rrc.local` es el
uno y único host Linux que forma parte de su instancia de [`fixed_brunelhand`](/workspaces/fixed_brunelhand.html)
tipo de espacio de trabajo.

Recuerde anteriormente en el tutorial que descargó key.pem, que debe usar
para conectarse a través de SSH. Como precaución de seguridad, los permisos en el archivo deben
evitar que otros usuarios lo lean. Suponiendo que movió key.pem al
directorio donde tienes una terminal, prueba

```bash
clave chmod 600.pem
```

Ahora, inicie una sesión SSH usando esta clave,

```bash
ssh -i key.pem root@rrc.local
```

Tenga en cuenta que en su instancia, tiene la cuenta raíz. No hay necesidad de usar
`sudo`, así que ten cuidado. (Puede crear una nueva cuenta de usuario si lo desea).

## Instalación de la herramienta Brunel Hand CLI

Ahora podemos instalar [un pequeño programa de línea de comandos para Brunel
mano](https://github.com/rerobots/brunel_hand_cli).
Para hacerlo, ingrese lo siguiente para obtener los paquetes necesarios:

```bash
apt-obtener actualización
apt-get -y install python3 python3-virtualenv
python3 -m virtualenv -p python3 PY
fuente PY/bin/activar
pip instalar bhand
```

Al final de la secuencia anterior, su instancia habrá instalado `bhand`
herramienta, que usaremos para ordenar movimientos. Verifique que esté instalado y que
el hardware Brunel Hand está operativo:

```bash
bhand
```
La salida debe ser similar a la siguiente:

```
Diagnósticos de impresión. (Pruebe `-h` para obtener ayuda).

#
     Diagnostico del sistema
____________________________

FW: Remolacha V1.01
Tablero: Castaño
Mano: Derecha
Hora: 00:00:01:77
Temperatura de la CPU: 26.61'C
Temperatura de IMU: 29.31'C
Errores: Sin errores
Modo: Ninguno
Motores: DESHABILITADOS
```

## Transmisión ROS de cámaras web

Para visualizar el espacio, iniciaremos nodos ROS que transmiten imágenes desde el
cámaras web La instancia ya cuenta con la instalación "desktop" de [ROS
Kinetic](https://wiki.ros.org/kinetic), pero para este tutorial, lo siguiente
también se deben instalar los paquetes: [cv_camera](https://wiki.ros.org/cv_camera) y
[servidor_video_web](https://wiki.ros.org/servidor_video_web). Para hacerlo,

```bash
apt-get -y install ros-kinetic-cv-camera ros-kinetic-web-video-server
```

En este tutorial, la declaración de nodos ROS es a través de un
[roslaunch](https://wiki.ros.org/roslaunch#Overview) archivo. Crear un archivo de texto en
su computadora llamada demo.launch y coloque lo siguiente en él:

```
<lanzamiento>
  <nodo nombre="video0" pkg="cv_camera" type="cv_camera_node">
    <param nombre="id_dispositivo" valor="0" />
  </nodo>
  <nodo nombre="video1" pkg="cv_camera" type="cv_camera_node">
    <param nombre="id_dispositivo" valor="1" />
  </nodo>
  <nodo nombre="webstreamer" pkg="web_video_server" type="web_video_server">
    <param nombre="dirección" valor="0.0.0.0" />
    <param nombre="puerto" valor="8080" />
<param nombre="ros_hilos" valor="2" />
  </nodo>
</lanzamiento>
```

Guárdelo y cópielo en el host de la instancia:

```bash
scp -i key.pem demo.launch root@rrc.local:/root/
```

Inicie una sesión SSH con `rrc.local` nuevamente e ingrese

```bash
roslaunch demo.lanzamiento
```

Luego, dirija su navegador web a <http://rrc.local:8080>. Las secuencias de video
enumerados provienen del nodo ROS `web_video_server`.

## Movimiento dominante

Inicie otra sesión SSH (algo así como `ssh -i key.pem root@rrc.local`) y
```bash
fuente PY/bin/activar
mano--raw A3
```

que debería terminar con una confirmación como

> Motores HABILITADOS

Ahora puede enviar comandos de movimiento. Por ejemplo,

```bash
bhand-sin procesar G0
```

hará que se forme un puño. Envíe el mismo comando nuevamente para alternar entre "abrir"
y cerca":

```bash
bhand-sin procesar G0
bhand-sin procesar G0
```

y vea la transmisión de video en su navegador web. Dependiendo de la velocidad de su
Conexión a Internet, puede haber algún retraso en el video. si el video tiene
retraso extremo, presione el botón de actualización.

![secuencia de video de ejemplo que muestra el movimiento de la mano](figures/vpn_brunelhand_demovideo.gif)

Se puede obtener un breve mensaje de ayuda para el programa CLI `bhand`

```bash
bhand --ayuda
```

y para obtener un mensaje de ayuda del firmware, intente

```bash
bhand --fw-ayuda
```

o, de manera equivalente, `bhand --raw \?`. Las especificaciones técnicas están disponibles en
la [página del producto Brunel Hand](https://www.openbionics.com/shop/brunel-hand) por
[Open Bionics] (https://www.openbionics.com/).

## Conclusión

Cuando haya terminado, regrese a <https://rerobots.net/instances>, busque la instancia
que creó en la tabla y presione el botón `terminar`.