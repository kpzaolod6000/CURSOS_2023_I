from collections import defaultdict

def map_reduce(data):
    # Paso 1: Función Map
    # intermediate_result = defaultdict(list)
    intermediate_result = {}

    for record in data:
        key, value = map_function(record)
        intermediate_result[key] = value
    # print(intermediate_result)
        
    # Paso 2: Función Reduce
    final_result = []
    
    for key, values in intermediate_result.items():
        print(key)
        print(values)
        # result = reduce_function(key, values)
        # final_result.append(result)
    
    return final_result

# Función Map
def map_function(record):
    # Implementa tu lógica de map aquí
    key = record[0]
    value = record[1]
    # Por ejemplo, extraer palabras de una oración
    words = value.split()
    mapped_values = [(word, 1) for word in words]
    
    return key, mapped_values

# Función Reduce
def reduce_function(key, values):
    # Implementa tu lógica de reduce aquí
    word_count = sum(values)
    result = (key, word_count)
    
    return result

# Datos de entrada
data = [
    ("document1", "Lorem ipsum dolor sit amet"),
    ("document2", "consectetur adipiscing elit"),
    ("document3", "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua")
]

# Ejecutar MapReduce
result = map_reduce(data)

# Imprimir resultados
for item in result:
    print(item)
