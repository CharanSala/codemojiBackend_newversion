def mystery_box2(num):
    """Check if a number is prime."""
    if num < 2:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

def mystery_box1(num):
    """Calculate the product of all prime numbers up to num."""
    result = 1
    for i in range(2, num + 1):
        if mystery_box2(i):
            result *= i
    return result

def mystery_box3(num):
    """Calculate the sum of divisors of num."""
    total = 0
    for i in range(1, num + 1):
        if num % i == 0:
            total += i
    return total

if __name__ == "__main__":
    n = int(input("Enter a numbe))
    prime_product = mystery_box1(n)
    result = mystery_box3(prime_product)
    print(result)