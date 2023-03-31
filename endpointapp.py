import usb.core
import usb.util

# ID продукта и вендора USB устройства
VENDOR_ID = 0x2CA3
PRODUCT_ID = 0x0022

# Открываем USB устройство
dev = usb.core.find(idVendor=VENDOR_ID, idProduct=PRODUCT_ID)
if dev is None:
    print("Error: Cannot find USB device")
    exit(1)

# Читаем данные с каждого эндпоинта
for cfg in dev:
    for intf in cfg:
        if dev.is_kernel_driver_active(intf.bInterfaceNumber):
            dev.detach_kernel_driver(intf.bInterfaceNumber)
        for ep in intf:
            try:
                # Читаем данные с эндпоинта
                data = dev.read(ep.bEndpointAddress, ep.wMaxPacketSize)
                print("Endpoint %d: %s" % (ep.bEndpointAddress, data))
            except usb.core.USBError as e:
                if e.args == ('Operation timed out',):
                    print("Endpoint %d: Timeout" % ep.bEndpointAddress)
                else:
                    print("Endpoint %d: Error (%s)" % (ep.bEndpointAddress, e))
