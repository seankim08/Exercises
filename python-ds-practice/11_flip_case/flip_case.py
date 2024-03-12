def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    upper = to_swap.upper()
    lower = to_swap.lower()
    
    for char in phrase:
        if char == upper:
            char = lower
        elif char == lower:
            char = upper
    
    return phrase
