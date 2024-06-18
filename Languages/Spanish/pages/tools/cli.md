---
title: CLI
---

#CLI

## Resumen

La interfaz de línea de comandos (CLI) para rerobots se realiza a través de un programa que
le permite buscar dispositivos, iniciar nuevas instancias y realizar otras
acciones de rerobots desde una terminal basada en texto.

El repositorio de código fuente correspondiente está alojado en <https://github.com/rerobots/cli>


## Instalación

### Lanzamientos

Ir a <https://github.com/rerobots/cli/releases>para encontrar la versión más reciente
archivos creados para objetivos populares como macOS o Linux en x86_64. si tu prefieres
el anfitrión no está en la lista, por favor [contáctenos](https://rerobots.net/contact).


### Construcción a partir del código fuente

Para construir para la propia computadora

```bash
cargo build --release --locked
```

Tenga en cuenta que el programa resultante puede vincularse dinámicamente a bibliotecas y,
por lo tanto, no se copia fácilmente a un host diferente. Para compilación cruzada y
creando programas estáticos (por lo tanto, evitando las dependencias del enlazador en tiempo de ejecución),
los lanzamientos se hacen con [cruz](https://github.com/rust-embedded/cross).
Por ejemplo, para compilar para Linux en Raspberry Pi,

```bash
cross build --target armv7-unknown-linux-musleabihf --release --locked
```


## Introducción

### Resumen

La interfaz de línea de comandos (CLI) se autodocumenta. Para empezar, prueba

```bash
rerobots help
```

lo que resultará en un mensaje similar al siguiente
```
USAGE:
    rerobots [FLAGS] [OPTIONS] [SUBCOMMAND]

FLAGS:
    -h, --help       Imprime información de ayuda
    -v, --verbose    Aumenta el nivel de detalle de los registros; ignorado si RUST_LOG es
definido
    -V, --version    Imprime el número de versión y sale

OPTIONS:
    -t <FILE>                archivo de texto sin formato que contiene token API; con este
bandera, la REROBOTS_API_TOKEN Variable ambiental
se ignora
	--format <FORMAT>    formato de salida; opciones: YAML , JSON

SUBCOMMANDS:
    help         Imprime este mensaje o la ayuda de los subcomandos dados.
    info         Imprimir resumen sobre la instancia
    isready      Indique si la instancia está lista con el código de salida
    launch       Instancia de lanzamiento desde la implementación o el tipo de espacio de trabajo especificado
    list         Listar todas las instancias de este usuario
    search       Busque implementaciones coincidentes. consulta vacía implica mostrar
todas las implementaciones de espacios de trabajo existentes
    ssh          Conéctese al host de la instancia a través de ssh
    terminate    Terminar instancia
    version      Imprime el número de versión y sale
    wdinfo       Imprimir resumen sobre la implementación del espacio de trabajo
```

Llamada `help` to aprender más acerca de los comandos, por ejemplo., `rerobots help info` to
aprender el uso de `rerobots info`.

Para usar un [token API](https://rerobots.net/tokens), asignarlo a la
Variable ambiental `REROBOTS_API_TOKEN`, o darlo a través de un archivo llamado en
el interruptor de línea de comando`-t`.


### Ejemplo

El siguiente video muestra cómo buscar tipos de espacios de trabajo, solicitar
una instancia, y finalmente terminarla. Lo mismo example is also presented below
in text. (This video can also be watched at <https://asciinema.org/a/l0l2yh83JtAM8RjDiOHsk3Q9F>)

{% asciinema id="l0l2yh83JtAM8RjDiOHsk3Q9F" /%}

Before beginning, [get an API token](/webui/making-and-revoking-api-tokens)
([desde la interfaz de usuario web](https://rerobots.net/tokens)). Ahora asígnalo a un
Variable ambiental. Por ejemplo, si el token API se guarda en un archivo local
Nombrada `tok`, Después

```bash
export REROBOTS_API_TOKEN=$(cat tok)
```

Buscar implementaciones de espacios de trabajo

```bash
# rerobots search misty
2c0873b5-1da1-46e6-9658-c40379774edf    fixed_misty2
```

Obtener más información sobre uno de ellos

```bash
# rerobots wdinfo 2c0873b5-1da1-46e6-9658-c40379774edf
{
  "cap": {
    "rules": []
  },
  "id": "2c0873b5-1da1-46e6-9658-c40379774edf",
  "type": "fixed_misty2",
  "type_version": 1,
  "supported_addons": [
    "cam",
    "mistyproxy"
  ],
  "desc": "",
  "region": "us:cali",
  "icounter": 641,
  "created": "2019-11-18 22:23:57.433893",
  "queuelen": 0
}

Darse cuenta de `queuelen = 0`, i.e., esta implementación de espacio de trabajo está disponible y
es probable que las solicitudes para crear una instancia ahora tengan éxito. Para hacerlo,

```bash
# rerobots launch 2c0873b5-1da1-46e6-9658-c40379774edf
f7856ad4-a9d7-43f5-8420-7073d10bceec
```

Obtener información sobre la nueva instancia

```bash
# rerobots info f7856ad4-a9d7-43f5-8420-7073d10bceec
{
  "id": "f7856ad4-a9d7-43f5-8420-7073d10bceec",
  "deployment": "2c0873b5-1da1-46e6-9658-c40379774edf",
  "type": "fixed_misty2",
  "region": "us:cali",
  "starttime": "2020-05-23 02:05:20.311535",
  "rootuser": "scott",
  "fwd": {
    "ipv4": "147.75.70.51",
    "port": 2210
  },
  "hostkeys": [
    "ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBPd5tTJLAksiu3uTbGwkBKXFb00XyTPeef6tn/0AMFiRpomU5bArpJnT3SZKhN3kkdT3HvTQiN5/dexOCFWNGUE= root@newc59"
  ],
  "status": "READY"
}
```

Cuándo `READY`,obtener la clave secreta SSH creada para la instancia

```bash
rerobots get-ssh-key f7856ad4-a9d7-43f5-8420-7073d10bceec
```

La sección `fwd` contiene una dirección IP y un puerto en el que las conexiones ssh pueden
establecerse en el host de la instancia. La CLI de rerobots proporciona una conveniente
comando para hacer esto::

```bash
rerobots ssh f7856ad4-a9d7-43f5-8420-7073d10bceec
```

Finalmente, `exit` el shell ssh y terminar la instancia

```bash
rerobots terminate f7856ad4-a9d7-43f5-8420-7073d10bceec
```
