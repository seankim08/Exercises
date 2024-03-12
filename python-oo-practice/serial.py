"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start):
        """Initialize the serial number"""
        self.start = start
        self.cur_num = start

            
    def generate(self):
        """Generate the serial number"""
        self.cur_num += 1
        return self.cur_num - 1
    
    def reset(self):
        """Reset the serial number to the start"""
        self.cur_num = self.start

