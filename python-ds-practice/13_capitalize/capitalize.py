def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    
    char = phrase[0]
    
    phrase = char.upper() + phrase[1:]
    
    return phrase