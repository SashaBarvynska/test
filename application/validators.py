from telnetlib import PRAGMA_HEARTBEAT
from django.http import JsonResponse


class CustomValidation:
    def __init__(self, fields: dict):
        self.__validate(fields)

    __error_fields = {}

    def __validate(self, fields: dict):
        for field_name, data in fields.items():
            value: str | int = data["value"]
            if data["validators"]["type"] == "str":

                max_length = data["validators"]["max_length"]
                if max_length <= len(value):
                    self.__error_fields[
                        field_name
                    ] = f"Value should be less than {max_length}"

                min_length = data["validators"]["min_length"]
                if min_length >= len(value):
                    self.__error_fields[
                        field_name
                    ] = f"Value should be more than or equal {min_length + 1}"

                if value.isalpha() == False:
                    self.__error_fields[
                        field_name
                    ] = "Value should be a string without symbols"

                if "enum" in data["validators"]:
                    if value not in data["validators"]["enum"]:
                        self.__error_fields[
                            field_name
                        ] = f"Value should be one of {data['validators']['enum']}"

            if data["validators"]["type"] == "int":
                if type(value) == str and value.isdigit() == False:
                    self.__error_fields[field_name] = f"value must be in number "

                if "length" in data["validators"]:
                    length = data["validators"]["length"]
                    if len(value) != length:
                        self.__error_fields[
                            field_name
                        ] = f"Value should be equal {length}"
                if "max_value" in data["validators"]:
                    max_value = data["validators"]["max_value"]
                    if max_value < int(value):
                        self.__error_fields[
                            field_name
                        ] = f"Value should be less than {max_value}"
                if "min_value" in data["validators"]:
                    min_value = data["validators"]["min_value"]
                    if min_value > int(value):
                        self.__error_fields[
                            field_name
                        ] = f"Value should be more than {min_value}"

                if (
                    "max_amount" in data["validators"]
                    or "min_amount" in data["validators"]
                ):
                    max_amount = data["validators"]["max_amount"]
                    min_amount = data["validators"]["min_amount"]

                    if max_amount < int(value) or min_amount > int(value):
                        self.__error_fields[
                            field_name
                        ] = f"value must be in the range ({min_amount} - {max_amount}) "

            if len(self.__error_fields) > 0:
                self.is_valid = False

    is_valid = True

    def get_errors(self):
        __error_fields = self.__error_fields.copy()
        self.__error_fields.clear()
        return JsonResponse({"error": {"fields": __error_fields}}, status=422)
