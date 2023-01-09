

class Bike {
    constructor() {
        this.partcount = 0;
        this.totalweight = 0;
        this.partslist = [];
        this.partslistdisplay = []
    }
    addPart(newname="apart", newdateinstalled=new Date(), newweight=1, restorename=newname, restoredateInstalled=newdateinstalled, restoreweight=newweight) {
        //Creates a part object that stays within the Bike class

        const newPart = new Part(this.partcount, newname, newdateinstalled, newweight, restorename, restoredateInstalled, restoreweight);
        this.partslist.push(newPart);
        this.partcount += 1;
        this.totalweight += newweight; //calculation between all parts
    }
    sortParts() {
        //Sorts part objects based by part name (A -> Z)
        this.partslist.sort((a, b) => {
            if (a.name < b.name) {
                return -1
            }
            if (a.name > b.name) {
                return 1
            }
            // A must be equal to b
            return 0
        })
    }
    filterParts(search) {
        //Searches all part objects in list for a name or "similar like" name
        let terms = [];
        let p;
        for (p of this.partslist) {
            if (p.name.includes(search)) {
                terms.push(p);
            }
        }
        return terms;
    }
    
    deletePart(partid) {
        //Deletes the part object with the given id
        //No validation needed since it is done beforehand
        for (var i = 0; i < this.partslist.length; i++) {
            if (this.partslist[i].id == partid) {
                this.partslist.splice(i, 1);
            }
        }
        
    }
    createJSONParts() {
        //creates the parts objects in a string JSON format
        let obj = ''
        let partsJSON = '{'
        for (let p of this.partslist) {
            obj = '"'+p.id+'":{"id":'+p.id+', "name":"'+p.name+'", "dateInstalled":"'+p.dateInstalled+'", "weight":'+p.weight+', "age":"'+p.age+'", "restorename":"'+p.restorename+'", "restoredateInstalled":"'+p.restoredateInstalled+'", "restoreweight":'+p.restoreweight+'},'
            partsJSON = partsJSON + obj
        }
        //remove the final comma and close the bracket
        partsJSON = partsJSON.slice(0, -1)
        partsJSON = partsJSON + '}'
        return partsJSON
    }
    savePartsToLocal(JSONstring) {
        //Save all parts to local storage
        try {
            localStorage.setItem("BikeParts", JSONstring);
            return true
        }
        catch {
            //Invalid JSONstring value
            return false
        }
    }
    loadPartsFromLocal() {
        //Get all part objects from localstorage, ASSUMES THE OBJECT IS ALWAYS THERE AND ALWAYS CORRECT
        //Since the instance of bike can be erased anytime, the Bike part objects are removed and
        //only the part objects from localstorage are accepted. This deals with duplicate entries as well
        const partStorage = localStorage.getItem('BikeParts');
        if (partStorage != null) {
            //localStorage.removeItem('BikeParts')
            const jsonObj = JSON.parse(partStorage);
            //reset class variables
            this.partslist = []
            this.partcount = 0;
            this.totalweight = 0;
            //reloads a new part object from the local storage parts
            
            for (let i = 0; i < Object.keys(jsonObj).length; i++) {
                this.addPart(jsonObj[i]["name"], jsonObj[i]["dateInstalled"], jsonObj[i]["weight"]);
            }
        }
        
    }
    specificSearchPart(searchname) {
        //Returns the first part in the bike object that matches the part being searched,
        //Returns "None" otherwise
        let p;
        for (p of this.partslist) {
            if (p.name == searchname) {
                return p;
            }
        }
        return "None";
    }
    getAllParts() {
        //Return the parts list from the Bike class
        return this.partslist;
    }
    getTotalWeight() {
        return this.totalweight;
    }
    partWeightDifference(obj) {
        //Gets the part obj and takes the part weight difference
        //Requirement for a part calculation
        let difference;
        difference = this.totalweight - obj.weight;
        return difference;
    }
    
    toString() {
        //Outputs all objects with their associated parameters.
        //Used for testing purposes
        let string = "";
        for (const i of this.partslist) {
            string += `id: ${i.id}, name: ${i.name}, date: ${i.dateInstalled}, weight: ${i.weight}, age: ${i.age}\n`;
        }
        return string;
    }
    checkValidMinWeight() {
        //Another way of validating, min should not be less than 0
        let weightList = []
        this.partslist.forEach(part => {
            weightList.push(part.weight)
        })
        if (Math.min(...weightList) > 0) {
            return true
        }
        else {
            return false
        }
    }

    getSpecificPart(partid) {
        //Searches the parts list for an id, returns part object if it exists
        let i;
        for (i of this.partslist) {
            if (i.id == partid) {
                return i;
            }
        }
        return null;
    }
}

class Part {
    constructor(newid, newname="apart", newdateinstalled=new Date(), newweight=1, restorename=newname, restoredateInstalled=newdateinstalled, restoreweight=newweight) {
        this.id = newid; //assigned by the Bike object. Since it must be unique, no default value

        //Validation before assigning object variables. If not valid, stick to defaults
        let validatedunits = this.constructorValidator(newname, newdateinstalled, newweight);
        //this.name, this.dateInstalled, this.weight = validatedunits

        [this.name, this.dateInstalled, this.weight] = validatedunits
        
        this.age = this.checkAge();

        //variables used for restore
        this.restorename = restorename;
        this.restoredateInstalled = restoredateInstalled;
        this.restoreweight = restoreweight;
    }

    constructorValidator(newname, newdateinstalled, newweight) {
        //In order to return multiple variables, the three variables being
        //validated will return in array format
        let returnarray = [];
        //First validate the name. Type string and numbers are allowed so any entry should be allowed
        //If no entry is given, default to "apart" as a neame
        if (newname.length >= 1) {
            returnarray.push(newname.toString());
        }
        else {
            returnarray.push("apart");
        }
        //Secondly validate the date. This comes in format DD/MM/YYYY
        //Type string and should have length of 10
        let datestr;
        try {
            const newdateinstalledobj = new Date(newdateinstalled)
            datestr = new Intl.DateTimeFormat('en-US').format(newdateinstalledobj)
        }
        catch {
            //Invalid date format, use todays date
            const newdateinstalledobj = new Date()
            datestr = new Intl.DateTimeFormat('en-US').format(newdateinstalledobj)
        }
        finally {
            returnarray.push(datestr);
        }
        
        //Lastly validate the weight, type number
        if (isNaN(newweight) == false) {
            returnarray.push(newweight);
        }
        else {
            returnarray.push(1);
        }
        return returnarray;
    }

    //Update part details here
    changeName(newname) {
        this.restorename = this.name;
        this.name = newname;
    }
    changeDate(newdateinstalled) {
        this.restoredateInstalled = this.dateInstalled;
        this.dateInstalled = newdateinstalled;
        this.age = this.checkAge();
    }
    changeWeight(newweight) {
        this.restoreweight = this.weight;
        this.weight = newweight;
    }

    restorePartDetails() {
        //This part restores to the changed main object variables.
        //It will be done in this one method.

        //The id of the part should never be changed
        this.name = this.restorename;
        this.dateInstalled = this.restoredateInstalled;
        this.weight = this.restoreweight;
        this.age = this.checkAge();

    }
    checkAge() {
        //This calculation will tag the part 'old' if the date of installation is greater than one year
        let date1 = new Date(); //todays date
        let date2 = new Date(this.dateInstalled) // already a date object
        //Date difference
        let difference = date1.getTime() - date2.getTime();
        //Days between two dates
        let dayDifference = difference / (1000 * 3600 * 24);
        //if the difference is greater than 365 we know the part installed is longer than a year
        //if the difference is negative then the part is installed sometime in the future
        if (dayDifference < 0 || dayDifference <= 365) {
            return "new";
        }
        else {
            return "old";
        }
    }
}

export {Bike, Part}

/*
//Run
let theBike = new Bike();
theBike.addPart("brake", "05-05-2000", 1);
theBike.addPart("front wheel", "02-11-2021", 1);
theBike.addPart("back wheel", "05-05-2020", 1);
theBike.addPart("chain", "01-30-2022", 0.5);
console.log(theBike.createJSONParts())

*/