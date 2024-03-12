def remove_every_other(lst):
    """Return a new list of other item.

        >>> lst = [1, 2, 3, 4, 5]

        >>> remove_every_other(lst)
        [1, 3, 5]

    This should return a list, not mutate the original:

        >>> lst
        [1, 2, 3, 4, 5]
    """
    result = []
    count = 0
    for val in lst:
        if (count % 2) == 0:
            count += 1
            result.append(val)
        else:
            count += 1
    
    return result
