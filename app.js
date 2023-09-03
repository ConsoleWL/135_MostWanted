
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            //! TODO
            results = searchByTraits(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

function searchByTraits(people) {

    const searchByTraitsChoise = validatedPrompt(
        'Please enter in what type of trait you would like to search.',
        ['gender', 'height', 'weight', 'eyeColor']
    );

    let results = [];
    switch (searchByTraitsChoise) {
        case 'gender':
            const genderSearchValue = validatedPrompt(
                'Please  choose the gender type:',
                ['male', 'female']
            );

            results = people.filter(function (person) {
                if (person.gender === genderSearchValue) {
                    return true;
                } else {
                    return false;
                }
            })
            break;
        case 'eyecolor':
            const eyeColorSearchValue = prompt('Please enter the eye color');
            results = people.filter(function (person) {
                if (person.eyeColor === eyeColorSearchValue) {
                    return true;
                } else {
                    return false;
                }
            })
            break;
        case 'height':
            // is there way to parse it here  into INT instead of in if statment below?
            const heightSearchValue = prompt("Please enter the height");
            results = people.filter(function (person) {
                if (person.height === parseInt(heightSearchValue)) {
                    return true;
                } else {
                    return false;
                }
            })
            break;
        case 'weight':
            const weightSearchvalue = prompt("Please entter the weight");
            results = people.filter(function (person) {
                if (person.weight === parseInt(weightSearchvalue)) {
                    return true;
                } else {
                    return false;
                }
            })
            break;
    }
    return results;
}

function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO
            displayPersonInfo(person);
            break;
        case "family":
            //! TODO
            let personFamily = findPersonFamily(person, people);
            displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            // let personDescendants = findPersonDescendants(person, people);
            // displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}
// I don;t know why but it doesn't work
function findPersonFamily(person, people) {
    const personFamily = [];
    const personSpouseId = person.currentSpouse;
    let spouse = people.filter(ps => ps.id === personSpouseId);
    personFamily.push(spouse);
    return personFamily;
}

function displayPersonInfo(person) {
    alert(
        `Person's info:\n
        Id: ${person.id}\n
        Name: ${person.firstName}\n
        Last Name: ${person.lastName}\n
        Gender: ${person.gender}\n
        Date of birth: ${person.dob}\n
        Height: ${person.height}\n
        Weight: ${person.weight}\n
        Eyes: ${person.eyeColor}\n
        Occupation: ${person.occupation}`
    );
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}