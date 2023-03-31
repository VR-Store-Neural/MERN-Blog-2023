import usb.core
import usb.util
import serial

# ID продукта и вендора USB устройства
VENDOR_ID = 0x2CA3
PRODUCT_ID = 0x0022

# Номер входного эндпоинта устройства
IN_ENDPOINT = 0x81

# Номер COM порта
COM_PORT = "COM2"

# Скорость передачи данных
BAUD_RATE = 115200

# Открываем USB устройство
dev = usb.core.find(idVendor=VENDOR_ID, idProduct=PRODUCT_ID)
if dev is None:
    print("Error: Cannot find USB device")
    exit(1)

else:
    print("USB device found")

    # Получаем дескриптор COM порта
    ser = serial.Serial(COM_PORT, BAUD_RATE)
    if not ser.is_open:
        print("Error: Cannot open COM port")
        exit(1)

    else:
        print("COM port opened")

        # Читаем данные с устройства и передаем их в COM порт
        while True:
            try:
                data = dev.read(IN_ENDPOINT, 64)
                ser.write(data)
            except usb.core.USBError as e:
                if e.errno == 110: # timeout
                    continue
                else:
                    print("Error: Cannot read from USB device (%s)" % str(e))
                    exit(1)