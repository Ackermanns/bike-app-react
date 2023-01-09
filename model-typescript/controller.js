// <<CONTROLLER>>
//Four controller classes made for jasmine testing purposes.
//For a new controller type, create a new static function within the controller and call it


class Controller {
    static getDateTest() {
        let dateToday;
        dateToday = getTodaysDate();
        return dateToday;
    }
    static bikeFeatureTests() {
        let theBike = new Bike();
        return theBike;
    }

    static bikeUseTests() {
        let theBike = new Bike();
        theBike.addPart("brake", "15-05-2000", 1);
        theBike.addPart("front wheel", "20-11-2021", 1);
        theBike.addPart("back wheel", "22-05-2020", 1);
        theBike.addPart("chain", "22-06-2022", 0.5);
        theBike.addPart(); //default value set test
        return theBike;
    }

    static partFeatureTests() {
        let theBike = new Bike();
        theBike.addPart("brake", "15-05-2000", 1);
        //Returning a single part object to check if its features exist for testing
        return theBike.getAllParts()[0];
    }

    static partUseTests() {
        let theBike = new Bike();
        theBike.addPart("brake", "15-05-2000", 1);
        theBike.addPart("front wheel", "20-11-2021", 1);
        theBike.addPart("chain", "22-06-2022", 0.5);
        theBike.addPart(); //default value set test
        return theBike;
    }
}

