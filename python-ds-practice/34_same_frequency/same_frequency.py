from collections import Counter

def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    num1 = [int(num) for num in str(num1)]
    num2 = [int(num) for num in str(num2)]
    
    if Counter(num1) == Counter(num2):
        return True
    return False