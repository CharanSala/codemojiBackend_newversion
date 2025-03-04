int fibonacciSum(int num) {
    int a = 0, b = 1, next, sum = 0;
    
    while (a <= num) {
        sum += a;
        next = a + b;
        a = b;
        b = next;
    }
    return sum;
}

// Function to reverse a number
int reverseNumber(int num) {
    int rev = 0;
    while (num > 0) {
        rev = rev * 10 + (num % 10);
        num /= 10;
    }
    return rev;
}

// Function to multiply each digit by 68
int multiplyDigitsBy68(int num) {
    int result = 0, place = 1;
    while (num > 0) {
        int digit = (num % 10) * 68;
        result += digit * place;
        place *= 100; // Adjusting place value to prevent digit overlap
        num /= 10;
    }
    return result;
}

int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);
    
    int sum = fibonacciSum(num); // Step 1: Find sum of Fibonacci series
    int reversed = reverseNumber(sum); // Step 2: Reverse the sum
    int result = multiplyDigitsBy68(reversed); // Step 3: Multiply each digit by 68
    
    printf("Result: %d\n", result);
    
    return 0;
}
