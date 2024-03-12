from random import randint

"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    
    def __init__(self, file):
        """Copy the lines of text from text file and print how many lines in that file"""
        
        self.file = open(file, "r") 
        self.lines = []
        self.getlines(self.file)
        self.file.close()
        
        print(str(len(self.lines)) + ' words read')
    
    def getlines(self, text):
        for line in text:
            if line.endswith("\n"):
                line = line.replace("\n", "")
            self.lines.append(line)
        
    def random(self):
        """Randomly print a line from the text file"""
        length = randint(0, len(self.lines) - 1)
        
        print (self.lines[length])
        

class SpecialWordFinder(WordFinder):
    """Wordfinder but it will now remove comments and empty lines"""
    
    def __init__(self, file):
        super().__init__(file)
        
    def getlines(self, text):
        for line in text:
            if not (line.startswith("#") or line.startswith("\n")):                
                if line.endswith("\n"):
                    line = line.replace("\n", "")
                self.lines.append(line)