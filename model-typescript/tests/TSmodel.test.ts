import { Bike, Part } from '../TSmodel';

describe('Model testing', () => {
  it('"addPart" should be callable', () => {
    let theBike = new Bike();
    expect(theBike.addPart).toBeDefined();
  })
  it('add parts', () => {
    let theBike = new Bike();
    theBike.addPart("brake", new Date("15-05-2000"), 1);
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    theBike.addPart("back wheel", new Date("22-05-2020"), 1);
    theBike.addPart("chain", new Date("22-06-2022"), 0.5);
    expect(theBike.getAllParts().length).toBe(4)
  })
  it('"sortParts" should be callable', () => {
    let theBike = new Bike();
    expect(theBike.sortParts).toBeDefined();
  })
  it('sort parts', () => {
    let theBike = new Bike();
    theBike.addPart("brake", new Date("15-05-2000"), 1);
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    theBike.addPart("back wheel", new Date("22-05-2020"), 1);
    theBike.addPart("chain", new Date("22-06-2022"), 0.5);
    theBike.sortParts()
    //Know that the "back wheel" part should be first
    expect(theBike.getAllParts()[0].name).toBe("back wheel")
  })
  it('"filterParts" should be callable', () => {
    let theBike = new Bike();
    expect(theBike.filterParts).toBeDefined();
  })
  it('filter parts', () => {
    let theBike = new Bike();
    theBike.addPart("brake", new Date("15-05-2000"), 1);
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    theBike.addPart("back wheel", new Date("22-05-2020"), 1);
    theBike.addPart("chain", new Date("22-06-2022"), 0.5);
    let filter = theBike.filterParts("wheel")
    //Know two parts names have "wheel" in them
    expect(filter.length).toBe(2)
  })
  it('"deletePart" should be callable', () => {
    let theBike = new Bike();
    expect(theBike.deletePart).toBeDefined();
  })
  it('deletePart parts', () => {
    let theBike = new Bike();
    theBike.addPart("brake", new Date("15-05-2000"), 1);
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    theBike.addPart("back wheel", new Date("22-05-2020"), 1);
    theBike.addPart("chain", new Date("22-06-2022"), 0.5);
    theBike.deletePart(0)
    theBike.deletePart(1)
    //Added four parts, removed two so should have two left
    expect(theBike.getAllParts().length).toBe(2)
  })
  it('"savePartsToLocal" should be callable', () => {
    let theBike = new Bike();
    expect(theBike.savePartsToLocal).toBeDefined();
  })
  it('savePartsToLocal parts', () => {
    let theBike = new Bike();
    theBike.addPart("brake", new Date("15-05-2000"), 1);
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    theBike.addPart("back wheel", new Date("22-05-2020"), 1);
    theBike.addPart("chain", new Date("22-06-2022"), 0.5);
    let theBikeStorage = theBike.createJSONParts()
    //To see if the function worked correctly, will need to run on browser
    //NOTE: not returning anythong so expected to execute without error
    expect(theBike.savePartsToLocal(theBikeStorage)).toBe(false)
  })
  it('"loadPartsFromLocal" should be callable', () => {
    let theBike = new Bike();
    expect(theBike.loadPartsFromLocal).toBeDefined();
  })
  it('Part "changeName" should be callable', () => {
    let theBike = new Bike();
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    let aPart = theBike.getAllParts()[0]
    expect(aPart.changeName).toBeDefined();
  })
  it('Part "changeDate" should be callable', () => {
    let theBike = new Bike();
    theBike.addPart("front wheel", new Date("06-06-2021"), 1);
    let aPart = theBike.getAllParts()[0]
    expect(aPart.changeDate).toBeDefined();
  })
  it('Part "changeWeight" should be callable', () => {
    let theBike = new Bike();
    theBike.addPart("front wheel", new Date("06-06-2021"), 1);
    let aPart = theBike.getAllParts()[0]
    expect(aPart.changeWeight).toBeDefined();
  })
  it('Part changes should be usable', () => {
    let theBike = new Bike();
    theBike.addPart("front wheel", new Date("06-06-2021"), 1);
    let aPart = theBike.getAllParts()[0]
    aPart.changeName("NEW NAME")
    aPart.changeDate(new Date("12-12-2020"))
    aPart.changeWeight(999)
    expect(aPart.name).toBe("NEW NAME");
    expect(aPart.weight).toBe(999);
  })
  it('Part "restorePartDetails" should be callable', () => {
    let theBike = new Bike();
    theBike.addPart("front wheel", new Date("06-06-2021"), 1);
    let aPart = theBike.getAllParts()[0]
    expect(aPart.restorePartDetails).toBeDefined();
  })
  it('Part restorePartDetails should be usable', () => {
    let theBike = new Bike();
    theBike.addPart("front wheel", new Date("06-06-2021"), 1);
    let aPart = theBike.getAllParts()[0]
    //Some changes
    aPart.changeName("NEW NAME")
    aPart.changeDate(new Date("12-12-2020"))
    aPart.changeWeight(999)
    //Restore changes
    aPart.restorePartDetails()
    expect(aPart.name).toBe("front wheel");
    expect(aPart.dateInstalled).toBe("6/6/2021");
    expect(aPart.weight).toBe(1);
  })
  it('Part "constructorValidator" should be callable', () => {
    let theBike = new Bike();
    theBike.addPart("front wheel", new Date("06-06-2021"), 1);
    let aPart = theBike.getAllParts()[0]
    expect(aPart.constructorValidator).toBeDefined();
  })
  it('Part "checkAge" should be callable', () => {
    let theBike = new Bike();
    theBike.addPart("front wheel", new Date("06-06-2021"), 1);
    let aPart = theBike.getAllParts()[0]
    expect(aPart.checkAge).toBeDefined();
  })
  it('Part should calculate "new"', () => {
    let theBike = new Bike();
    theBike.addPart("front wheel", new Date(), 1);
    let aPart = theBike.getAllParts()[0]
    expect(aPart.age).toBe("new");
  })
  it('Part should calculate "old"', () => {
    let theBike = new Bike();
    theBike.addPart("front wheel", new Date("12-12-2000"), 1);
    let aPart = theBike.getAllParts()[0]
    expect(aPart.age).toBe("old");
  })
  it('"getTotalWeight" should be callable', () => {
    let theBike = new Bike();
    theBike.addPart("front wheel", new Date("06-06-2021"), 1);
    expect(theBike.getTotalWeight).toBeDefined();
  })
  it('getTotalWeight parts', () => {
    let theBike = new Bike();
    theBike.addPart("brake", new Date("15-05-2000"), 1);
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    theBike.addPart("back wheel", new Date("22-05-2020"), 1);
    theBike.addPart("chain", new Date("22-06-2022"), 0.5);
    //Expect the sum of part weight to be 3.5
    expect(theBike.getTotalWeight()).toBe(3.5)
  })
  it('partWeightDifference parts', () => {
    let theBike = new Bike();
    theBike.addPart("brake", new Date("15-05-2000"), 1);
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    theBike.addPart("back wheel", new Date("22-05-2020"), 1);
    theBike.addPart("chain", new Date("22-06-2022"), 0.5);
    let aPart = theBike.getAllParts()[0]
    //Test the part weight difference part(1), total(3.5) so expect (2.5) 
    expect(theBike.partWeightDifference(aPart)).toBe(2.5)
  })
  it('AddPart should have default values', () => {
    let theBike = new Bike();
    theBike.addPart();
    let aPart = theBike.getAllParts()[0]
    let todaysDate = new Date()
    //Expect default values
    expect(aPart.name).toBe("apart")
    expect(aPart.dateInstalled).toBe(new Intl.DateTimeFormat('en-US').format(todaysDate))
    expect(aPart.weight).toBe(1)
  })
  it('"specificSearchPart" should be callable', () => {
    let theBike = new Bike();
    expect(theBike.specificSearchPart).toBeDefined();
  })
  it('"specificSearchPart" parts', () => {
    let theBike = new Bike();
    theBike.addPart("brake", new Date("15-05-2000"), 1);
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    theBike.addPart("back wheel", new Date("22-05-2020"), 1);
    theBike.addPart("chain", new Date("22-06-2022"), 0.5);
    //Search for part with part name
    let thePart = theBike.specificSearchPart("chain")
    expect(thePart.name).toBe("chain")
  })
  it('"getAllParts" should be callable', () => {
    let theBike = new Bike();
    expect(theBike.getAllParts).toBeDefined();
  })
  it('"getAllParts" parts', () => {
    let theBike = new Bike();
    theBike.addPart("brake", new Date("15-05-2000"), 1);
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    theBike.addPart("back wheel", new Date("22-05-2020"), 1);
    theBike.addPart("chain", new Date("22-06-2022"), 0.5);
    expect(theBike.getAllParts().length).toBe(4)
  })
  //EXTRA TESTS
  //Bike toString method
  it('"toString" bike', () => {
    let theBike = new Bike();
    theBike.addPart("brake", new Date("15-05-2000"), 1);
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    theBike.addPart("back wheel", new Date("22-05-2020"), 1);
    theBike.addPart("chain", new Date("22-06-2022"), 0.5);
    let str = theBike.toString()
    expect(str).toBe("id: 0, name: brake, date: 6/7/2022, weight: 1, age: new\nid: 1, name: front wheel, date: 6/7/2022, weight: 1, age: new\nid: 2, name: back wheel, date: 6/7/2022, weight: 1, age: new\nid: 3, name: chain, date: 6/7/2022, weight: 0.5, age: new\n")
  })
  it('"checkValidMinWeight" bike', () => {
    let theBike = new Bike();
    theBike.addPart("brake", new Date("15-05-2000"), 1);
    theBike.addPart("front wheel", new Date("20-11-2021"), 1);
    theBike.addPart("back wheel", new Date("22-05-2020"), 1);
    theBike.addPart("chain", new Date("22-06-2022"), 0.5);
    expect(theBike.checkValidMinWeight()).toBe(true)
  })
})