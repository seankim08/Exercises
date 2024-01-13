class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk() {
        return "Beep";
    }

    toString() {
        return 'This vehicle is a ' + this.make + ' ' + this.model + " from " + this.year + "."
    }

}

class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
}

class Garage {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }

    add(vhc) {
        if(this.vehicles.length < this.capacity) {
            if(vhc instanceof Vehicle) {
                this.vehicles.push(vhc);
            }
            else {
                //throw new Error('Only vehicles are allowed in here!');
                return 'Only vehicles are allowed in here!';
            }
        }
        else {
            //throw new Error("Sorry, we're full.");
            return "Sorry, we're full.";
        }
    }
}