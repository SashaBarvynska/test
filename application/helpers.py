import random


def generate_mobile_number():
    phone_number = ""
    for i in range(11):
        phone_number += str(random.randint(0, 9))
    return phone_number
