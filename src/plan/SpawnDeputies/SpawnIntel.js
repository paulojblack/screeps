const creepDesigns = {};

creepDesigns.builder = (budget, room) => {
    const design = [MOVE, CARRY, CARRY, WORK];
    let spent = 250;

    budget = Math.min(1000, budget);

    // Add as many WORK, CARRY and MOVE as we can
    while (spent + 200 <= budget) {
        design.push(WORK);
        design.push(CARRY);
        design.push(MOVE);
        spent += 200;
    }

    if (spent + 100 <= budget) {
        design.push(WORK);
        spent += 100;
    }

    if (spent + 50 <= budget) {
        design.push(CARRY);
        spent += 50;
    }

    return design;
},
creepDesigns.harvester = (budget, room) => {
    const design = [MOVE, CARRY, WORK];
    let spent = 200;

    while (spent + 200 <= budget) {
        design.push(MOVE);
        design.push(CARRY);
        design.push(WORK);
        spent += 200;
    }

    if (spent + 100 <= budget) {
        design.push(WORK);
        spent += 100;
    }

    if (spent + 50 <= budget) {
        design.push(CARRY);
        spent += 50;
    }

    return design;
},
creepDesigns.upgrader = (budget, room) => {
    const design = [MOVE, CARRY, CARRY, WORK];
    let spent = 250;

    // Add as many WORK, CARRY and MOVE as we can
    while (spent + 50 <= budget) {
        design.push(CARRY);
        spent += 50;

        if (spent + 50 > budget) {
            return design;
        }
        design.push(MOVE);
        spent += 50;

        if (spent + 50 > budget) {
            return design;
        }
        design.push(CARRY);
        spent += 50;

        if (spent + 50 > budget) {
            return design;
        }
        design.push(CARRY);
        spent += 50;

        if (spent + 50 > budget) {
            return design;
        }
        design.push(MOVE);
        spent += 50;

        if (spent + 100 > budget) {
            return design;
        }
        design.push(WORK);
        spent += 100;
    }

    return design;
};

const getUnusedName = () => {
    const names1 = ['Sophia', 'Emma', 'Olivia', 'Isabella', 'Mia', 'Ava', 'Lily', 'Zoe', 'Emily', 'Chloe', 'Layla', 'Madison', 'Madelyn', 'Abigail', 'Aubrey', 'Charlotte', 'Amelia', 'Ella', 'Kaylee', 'Avery', 'Aaliyah', 'Hailey', 'Hannah', 'Addison', 'Riley', 'Harper', 'Aria', 'Arianna', 'Mackenzie', 'Lila', 'Evelyn', 'Adalyn', 'Grace', 'Brooklyn', 'Ellie', 'Anna', 'Kaitlyn', 'Isabelle', 'Sophie', 'Scarlett', 'Natalie', 'Leah', 'Sarah', 'Nora', 'Mila', 'Elizabeth', 'Lillian', 'Kylie', 'Audrey', 'Lucy', 'Maya', 'Annabelle', 'Makayla', 'Gabriella', 'Elena', 'Victoria', 'Claire', 'Savannah', 'Peyton', 'Maria', 'Alaina', 'Kennedy', 'Stella', 'Liliana', 'Allison', 'Samantha', 'Keira', 'Alyssa', 'Reagan', 'Molly', 'Alexandra', 'Violet', 'Charlie', 'Julia', 'Sadie', 'Ruby', 'Eva', 'Alice', 'Eliana', 'Taylor', 'Callie', 'Penelope', 'Camilla', 'Bailey', 'Kaelyn', 'Alexis', 'Kayla', 'Katherine', 'Sydney', 'Lauren', 'Jasmine', 'London', 'Bella', 'Adeline', 'Caroline', 'Vivian', 'Juliana', 'Gianna', 'Skyler', 'Jordyn', 'Jackson',];
    const names2 = ['Aiden', 'Liam', 'Lucas', 'Noah', 'Mason', 'Jayden', 'Ethan', 'Jacob', 'Jack', 'Caden', 'Logan', 'Benjamin', 'Michael', 'Caleb', 'Ryan', 'Alexander', 'Elijah', 'James', 'William', 'Oliver', 'Connor', 'Matthew', 'Daniel', 'Luke', 'Brayden', 'Jayce', 'Henry', 'Carter', 'Dylan', 'Gabriel', 'Joshua', 'Nicholas', 'Isaac', 'Owen', 'Nathan', 'Grayson', 'Eli', 'Landon', 'Andrew', 'Max', 'Samuel', 'Gavin', 'Wyatt', 'Christian', 'Hunter', 'Cameron', 'Evan', 'Charlie', 'David', 'Sebastian', 'Joseph', 'Dominic', 'Anthony', 'Colton', 'John', 'Tyler', 'Zachary', 'Thomas', 'Julian', 'Levi', 'Adam', 'Isaiah', 'Alex', 'Aaron', 'Parker', 'Cooper', 'Miles', 'Chase', 'Muhammad', 'Christopher', 'Blake', 'Austin', 'Jordan', 'Leo', 'Jonathan', 'Adrian', 'Colin', 'Hudson', 'Ian', 'Xavier', 'Camden', 'Tristan', 'Carson', 'Jason', 'Nolan', 'Riley', 'Lincoln', 'Brody', 'Bentley', 'Nathaniel', 'Josiah', 'Declan', 'Jake', 'Asher', 'Jeremiah', 'Cole', 'Mateo', 'Micah', 'Elliot'];

    const namesCombined = _.flatten(_.map(names1, (v, i) => [v, names2[i]]));

    return namesCombined[Math.floor(Math.random() * namesCombined.length)];
};

module.exports = {
    creepDesigns,
    getUnusedName
};
