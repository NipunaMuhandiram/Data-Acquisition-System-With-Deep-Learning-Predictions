from django.urls import path
from .views import get_current_port, get_thresholds, set_thresholds, start_serial_listener, get_received_data, list_com_ports,send_serial_command

urlpatterns = [
    path('start-listening/', start_serial_listener, name='start-listening'),
    path('received-data/', get_received_data, name='received-data'),
    path('available-ports/', list_com_ports, name='available-ports'),  # Add this line
    path('send_command_to_serial/', send_serial_command, name='send_command_to_serial'),
    path('current_port/', get_current_port, name='get_current_port'),
    path("get_thresholds/", get_thresholds, name="get_thresholds"),
    path("set_thresholds/", set_thresholds, name="set_thresholds"),
]
