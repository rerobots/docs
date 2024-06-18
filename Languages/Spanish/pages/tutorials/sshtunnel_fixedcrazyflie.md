# Instancia basada en túnel SSH con Crazyflie fijo

## Resumen

En este tutorial, se muestra cómo instanciar un espacio de trabajo al que se accede
a través de un túnel SSH. Como ejemplo, el tipo de espacio de trabajo que se muestra aquí es
[`fixed_crazyflie`](/workspaces/fixed_crazyflie.html), pero los pasos básicos se pueden aplicar a cualquier tipo para el que SSH
la tunelización es una opción.

Si quieres ver un video de ejemplo que puedas reproducir salta a la sección
[Revisando resultados](#revisando-resultados).
Si cree que falta algo o si encuentra errores, [comuníquese con
us](https://rerobots.net/contact) o [abrir un
boleto] (https://github.com/rerobots/docs/issues).
## Buscando

Para comenzar, inicie sesión en <https://rerobots.net> y vaya a [la búsqueda
página](https://rerobots.net/search). Como ejemplo en este tutorial, usaremos
una implementación de espacio de trabajo que tiene el tipo [`fixed_crazyflie`](/workspaces/fixed_crazyflie.html). Tenga en cuenta, sin embargo, el
Los pasos básicos se pueden aplicar en cualquier lugar donde se establezca una conexión basada en túnel SSH.
deseado. Si uno no está ya en la lista, ingrese "fixed_crazyflie" en la búsqueda
o pruebe con la siguiente URL:
<https://rerobots.net/search?q=fixed_crazyflie&maxl=u>
Debe haber al menos una coincidencia, como en la siguiente captura de pantalla:

![captura de pantalla de la página de búsqueda](figures/sshtunnel_fixedcrazyflie_search.png)

Haga clic en la foto o en la "identificación de implementación" de uno de los elementos en la búsqueda
resultados. Obtendrá una breve descripción del espacio de trabajo.

## Solicitando una instancia

Para solicitar el uso de la implementación del espacio de trabajo que está viendo, haga clic en el
botón "Solicitar instancia". La siguiente página proporciona algunas opciones sobre el
instancia que va a crear. Debería verse como:

![captura de pantalla de la página para crear una nueva instancia](figures/sshtunnel_fixedcrazyflie_new_instance_dialog.png)

En "tipo de conexión", seleccione "túnel SSH". Para la clave pública SSH que
proporciona autorización para el inicio de sesión remoto en la instancia, puede seleccionar uno
que [subiste previamente](/webui/uploading-ssh-public-keys), o tú
puede generar un nuevo par de claves para usted como parte de la creación de instancias. Cuando estás
listo, solicita la instancia. Se está desarrollando un sistema de reservas, por lo que su
la solicitud podría ser denegada si alguien más comenzara a usar el mismo espacio de trabajo. Si
encuentra dificultades aquí, por favor [contacto
nosotros](https://rerobots.net/contact).

Si se acepta su solicitud, será redirigido a una [página que muestra
todas sus instancias activas] (https://rerobots.net/instances). Si seleccionaste
para generar un nuevo par de claves SSH, observe que ahora hay un mensaje en el
parte superior de la página:

> ¡Tu nueva instancia de espacio de trabajo se está inicializando! Porque no usaste una clave SSH
> que ya está asociado a su cuenta de usuario, se generó un nuevo par de claves
> para esta instancia. El siguiente enlace se puede utilizar para descargar la clave privada
> precisamente una vez.

En este caso, cuando esté listo, seleccione el enlace "Descargar clave privada". a
descargue un archivo llamado `key.pem`. Tenga cuidado de hacer clic en el enlace solo cuando esté
listo para la descarga. Si seleccionó usar una de [las llaves SSH ya
asociado con su cuenta] (https://rerobots.net/sshkeys), entonces no hay
enlace a "descargar clave privada" porque se supone que ya tiene la
correspondiente clave privada.

En la tabla de tus instancias, encontrarás la que acabas de crear. Su
el estado debe ser `INIT`, lo que indica que se está inicializando.
## Tu primer inicio de sesión

Después de varios segundos o minutos, la instancia estará LISTO como en el siguiente
captura de pantalla de ejemplo:

![texto de estado de instancia lista](figures/sshtunnel_fixedcrazyflie_instancedetails.png)

En el panel de detalles, se enumeran una dirección IP y un número de puerto. en esta dirección
y el puerto hay un servidor SSH escuchando las conexiones entrantes al principal
host de su instancia. Además, observe la subsección titulada "reglas de firewall". Eso
contiene una tabla de reglas que determinan qué hosts pueden enviar paquetes al
Servidor SSH que está escuchando su instancia. Tenga en cuenta que incluso si
paquetes pueden llegar al servidor SSH, es necesario tener la correcta
clave privada para iniciar sesión, independientemente de las reglas del firewall.

El comportamiento predeterminado es descartar todos los paquetes entrantes, por lo que es al menos
necesario agregar una regla para permitirle iniciar sesión. Hay varios métodos para
determinar la dirección visible desde el exterior desde la que está accediendo al
Internet. Por ejemplo, en la terminal, intente

```bash
rizo https://ipinfo.io/
```

Se pueden agregar nuevas reglas en el panel titulado "modificar reglas de firewall", como se muestra en la captura de pantalla:

![captura de pantalla del formulario para modificar las reglas del firewall](figures/sshtunnel_fixedcrazyflie_modifyfirewall.png)

Las direcciones se especifican en notación CIDR ([RFC
4632](https://tools.ietf.org/html/rfc4632)). El valor predeterminado (si no hay una máscara de red)
declarado) es `/32`, es decir, solo de la dirección dada. Mientras que por una larga vida
Por lo general, no es deseable aceptar tráfico desde cualquier lugar, puede usar
`0.0.0.0/0` para hacerlo.
Ahora debería haber una fila en la tabla de reglas de firewall: `0.0.0.0/0 ACCEPT`.

Para iniciar sesión, abra una terminal. Suponiendo que su clave privada está en el local
directorio en el archivo key.pem, luego,

```bash
ssh -i clave.pem -p 2211 root@147.75.69.207
```
Si seleccionó una clave SSH que se carga en su cuenta de rerobots, entonces el
el interruptor `-i key.pem` se puede omitir o cambiar según sea necesario.
La clave de host presentada por el servidor SSH se puede comparar con la listada en
el panel de detalles (el ejemplo se muestra en una captura de pantalla anterior en este tutorial).

## Instalación de paquetes necesarios

Para visualizar el espacio, iniciaremos un nodo ROS que transmita imágenes desde el
cámara web. La instancia ya cuenta con la instalación "desktop" de [ROS
Kinetic](https://wiki.ros.org/kinetic), pero para este tutorial, el
El paquete [cv_camera](https://wiki.ros.org/cv_camera) también debe estar instalado. A
hazlo,

```bash
apt-obtener actualización
apt-get install -y ros-kinetic-cv-cámara
```

Para enviar comandos de empuje al [Crazyflie
quadrotor](https://www.bitcraze.io/crazyflie-2/) en este tutorial, `cfheadless`
debe ser instalado. Es parte del [cliente Crazyflie
software] (https://github.com/bitcraze/crazyflie-clients-python).
La versión actual se puede instalar desde

```bash
apt-obtener actualización
apt-get install -y python3 python3-pip python3-pyqt5
pip3 instalar -U pip
pip instalar cfclient
```

Finalmente, cree una configuración mínima creando el archivo
/root/.config/cfclient/config.json con el contenido

```json
{
  "habilitar_zmq_input": verdadero
}
```

Esto se puede lograr en un comando,

```bash
mkdir -p /root/.config/cfclient && echo '{"enable_zmq_input": true}' > /root/.config/cfclient/config.json
```
Finalmente, inicie `cfheadless` para conectarse a un Crazyflie que está conectado al
anfitrión a través de USB:

```bash
cfheadless -u usb://0
```

## Ejecutar un controlador de bucle abierto y grabar un video

Ahora que `cfheadless` está usando la terminal para la salida, abre una nueva terminal y
inicie sesión nuevamente en el host de la instancia a través de SSH. Cree un archivo llamado demo.py con el
siguientes contenidos:

```pitón
tiempo de importación
importar zmq

remitente = zmq.Context().socket(zmq.PUSH)
remitente.conectar('tcp://127.0.0.1:1212')

remitente.send_json({
'versión 1,
    'control': {
'rollo': 0.0,
'tono': 0.0,
'guiñada': 0.0,
'empuje': 0.0
    }
})

tiempo.dormir(1)

remitente.send_json({
    'versión 1,
    'control': {
'rollo': 0.0,
'tono': 0.0,
'guiñada': 0.0,
'empuje': 35.0
    }
})

tiempo.dormir(2)

remitente.send_json({
    'versión 1,
    'control': {
'rollo': 0.0,
'tono': 0.0,
'guiñada': 0.0,
'empuje': 0.0
    }
})
```

Este programa de Python ordena empuje cero, empuje positivo pequeño y después de 2
segundos, empuje cero de nuevo.
Para crear un archivo de registro de demostración, ejecutaremos el nodo ROS `cv_camera_node`, `rosbag
record` y `demo.py` (el archivo definido anteriormente), cada uno de los cuales requiere su propio
Terminal. Para hacerlo, inicie tantos inicios de sesión SSH nuevos como sea necesario, o use una terminal
herramienta de multiplexación como `screen` o `tmux`, y ejecute cada uno de

```bash
roscore
Rosrun cv_camera cv_camera_node
registro de rosbag -a
python3 demo.py
```

Después de que finalice demo.py, elimine el proceso `rosbag record` y comprima el registro
expediente:

```bash
compresa rosbag *bolsa
```
Luego, descargue el archivo de registro comprimido a su almacenamiento local. Hay varios
herramientas disponibles para copiar archivos a través de una conexión SSH, como `scp`. Por ejemplo,
puede usar un comando como el siguiente:

```bash
scp -i ~/.ssh/unodist -P 2210 root@147.75.69.207:/root/2018-02-27-00-05-15.bag.
```

Tenga en cuenta que para especificar el número de puerto utilizado por `scp`, el interruptor está en mayúsculas
`-P`.

## Revisión de resultados

Suponiendo que tiene ROS instalado localmente, el
El archivo [rosbag](https://wiki.ros.org/rosbag) se puede reproducir a una velocidad más lenta
y revisado visualmente en [rqt](https://wiki.ros.org/rqt). Después de comenzar
`roscore`, ejecuta un proceso de `rosbag play` mediante un comando como

```bash
rosbag jugar -r 0.25 2018-02-27-00-05-15.bolsa
```

Abra la GUI `rqt`, seleccione el menú desplegable "Complementos", luego "Visualización",
y "Vista de imagen". El complemento Image View puede mostrar imágenes de la
Tema ROS `/cv_camera/image_raw`, que contiene datos de la cámara web en el
espacio de trabajo de este tutorial.

![secuencia de video de ejemplo que muestra el giro de las palas del rotor](figures/sshtunnel_fixedcrazyflie_demovideo.gif)

## Conclusión

Cuando haya terminado, regrese a <https://rerobots.net/instances>, busque la instancia
que creó en la tabla y presione el botón `terminar`.