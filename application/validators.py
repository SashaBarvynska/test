from django.http import JsonResponse

class CustomValidation:
    def __init__(self, fields: dict):
        self.__validate(fields)
    
    __error_fields = {}
    
    def __validate(self, fields: dict):
        for field_name, data in fields.items():
            value: str = data['value']
            if data['validators']['type'] == 'str':
                
                maxlength = data['validators']['maxlength']
                if maxlength <= len(value):
                    self.__error_fields[field_name] = f'Value should be less than {maxlength}'

                minlength = data['validators']['minlength']
                if minlength > len(value):
                    self.__error_fields[field_name] = f'Value should be more than {minlength}'
                
                if value.isalpha()== False:
                    self.__error_fields[field_name] = 'Value should be a string without symbols'

            if data['validators']['type'] == 'int':
                max_value = data['validators']['max_value']
                if max_value < int(value):
                    self.__error_fields[field_name] = f'Value should be less than {max_value}'
                
                min_value = data['validators']['min_value']
                if min_value > int(value):
                    self.__error_fields[field_name] = f'Value should be more than {min_value}'
                    
            if len(self.__error_fields) > 0: 
                self.is_valid = False
    
    is_valid = True

    def get_errors(self):
        __error_fields = self.__error_fields.copy()
        self.__error_fields.clear()
        return JsonResponse({'error': {'fields' : __error_fields}}, status=422)
