export class TestBuilder {
    static buildRequirements(_tests){
        let container = document.querySelector('.section ul.collapsible')

        _tests.forEach(function(_test){
            container.append(TestBuilder.buildRequirement(_test))
        })
    }

    static buildRequirement(_test){
        // Generate element ID
        const id = TestBuilder.generateIdFromTestName(_test.name);

        // Create li element
        const listItem = document.createElement('li');
        listItem.classList.add(id);

        // Create div element with class "collapsible-header"
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('collapsible-header');

        // Create i element with class "material-icons"
        const iconElement = document.createElement('i');
        iconElement.classList.add('material-icons');
        iconElement.textContent = 'analytics';

        // Create span element with class "score excellent"
        const scoreSpan = document.createElement('span');
        scoreSpan.classList.add('score', 'excellent');
        scoreSpan.textContent = `${_test.value}/${_test.value}`;

        // Append child elements to headerDiv
        headerDiv.appendChild(iconElement);
        headerDiv.appendChild(document.createTextNode(_test.name));
        headerDiv.appendChild(scoreSpan);

        // Append headerDiv to listItem
        listItem.appendChild(headerDiv);

        // Create div element with class "collapsible-body"
        const bodyDiv = document.createElement('div');
        bodyDiv.classList.add('collapsible-body');

        // console.log(_test);

        _test.requirements.forEach(function(requirement){
            // Create label element
            const labelElement = document.createElement('label');

            const requirementId = TestBuilder.generateRequirementIdFromName(requirement.name)

            // Create input element with type "checkbox" and value "id"
            const checkboxInput = document.createElement('input');
            checkboxInput.setAttribute('type', 'checkbox');
            checkboxInput.setAttribute('value', id + '-' + requirementId);

            // Create span element
            const spanElement = document.createElement('span');
            spanElement.textContent = requirement.inverse;

            // Append input and span elements to labelElement
            labelElement.appendChild(checkboxInput);
            labelElement.appendChild(spanElement);

            // Append labelElement to bodyDiv
            bodyDiv.appendChild(labelElement);
            bodyDiv.appendChild(document.createElement('br'));
        });


        // Create textarea element with id "t01_comment" and class "materialize-textarea"
        const textareaElement = document.createElement('textarea');
        textareaElement.setAttribute('id', id + '-comment');
        textareaElement.classList.add('materialize-textarea');

        // Create label element for textarea
        const textareaLabel = document.createElement('label');
        textareaLabel.setAttribute('for', id + '-comment');
        textareaLabel.textContent = 'Additional Comments';

        // Append textarea and label elements to bodyDiv
        bodyDiv.appendChild(textareaElement);
        bodyDiv.appendChild(textareaLabel);

        // Append bodyDiv to listItem
        listItem.appendChild(bodyDiv);

        return listItem;
    }

    static buildPenalties(_penalties){
        let container = document.querySelector('.section ul.collapsible');

        // Generate element ID
        const id = "penalties";

        // Create li element
        const listItem = document.createElement('li');
        listItem.classList.add(id);

        // Create div element with class "collapsible-header"
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('collapsible-header');

        // Create i element with class "material-icons"
        const iconElement = document.createElement('i');
        iconElement.classList.add('material-icons');
        iconElement.textContent = 'analytics';

        // Create span element with class "score excellent"
        const scoreSpan = document.createElement('span');
        scoreSpan.classList.add('score', 'excellent');
        scoreSpan.textContent = 0;

        // Append child elements to headerDiv
        headerDiv.appendChild(iconElement);
        headerDiv.appendChild(document.createTextNode("Penalties"));
        headerDiv.appendChild(scoreSpan);

        // Append headerDiv to listItem
        listItem.appendChild(headerDiv);

        // Create div element with class "collapsible-body"
        const bodyDiv = document.createElement('div');
        bodyDiv.classList.add('collapsible-body');

        // console.log(_test);

        _penalties.forEach(function(_penalty){
            // Create label element
            const labelElement = document.createElement('label');

            // Create input element with type "checkbox" and value "id"
            const checkboxInput = document.createElement('input');
            checkboxInput.setAttribute('type', 'checkbox');
            checkboxInput.setAttribute('value', _penalty.id);

            // Create span element
            const spanElement = document.createElement('span');
            spanElement.textContent = _penalty.name;

            // Append input and span elements to labelElement
            labelElement.appendChild(checkboxInput);
            labelElement.appendChild(spanElement);

            // Append labelElement to bodyDiv
            bodyDiv.appendChild(labelElement);
            bodyDiv.appendChild(document.createElement('br'));
        });

        // Append bodyDiv to listItem
        listItem.appendChild(bodyDiv);

        container.append(listItem);
    }

    static buildTestResults(_tests){
        let container = document.querySelector('.feedback')

        _tests.forEach(function(_test){
            container.append(TestBuilder.buildTestResult(_test))
        })
    }

    static buildTestResult(_test){
        // Generate element ID
        const id = TestBuilder.generateIdFromTestName(_test.name);

        // Create div element with class "t01-output"
        const outputDiv = document.createElement('div');
        outputDiv.classList.add(id + '-output');

        // Create strong element with class "output-header"
        const outputHeader = document.createElement('strong');
        outputHeader.classList.add('output-header');
        outputHeader.textContent = _test.name + ": ";

        // Create span element for score
        const scoreSpanOutput = document.createElement('span');
        scoreSpanOutput.textContent = `${_test.value}/${_test.value}`;

        // Append span to strong element
        outputHeader.appendChild(scoreSpanOutput);

        // Append strong element to outputDiv
        outputDiv.appendChild(outputHeader);

        // Create ul element with class "output-list"
        const outputList = document.createElement('ul');
        outputList.classList.add('output-list');

        _test.requirements.forEach(function(_requirement){
            const requirementId = TestBuilder.generateRequirementIdFromName(_requirement.name)

            // Create li element with class "t01-hello"
            const reqListItem = document.createElement('li');
            reqListItem.classList.add(`${id}-${requirementId}`);
            reqListItem.style.color = 'rgb(74, 145, 57)';
            reqListItem.style.fontWeight = 'bold';
            reqListItem.style.marginTop = '4px';

            // Create span for feedback
            const feedbackSpan = document.createElement('span');
            feedbackSpan.classList.add('feedback');
            feedbackSpan.textContent = _requirement.requirement;

            // Create span for checkmark
            const checkmarkSpan = document.createElement('span');
            checkmarkSpan.textContent = ' ✓';

            // Append spans to li element
            reqListItem.appendChild(feedbackSpan);
            reqListItem.appendChild(checkmarkSpan);

            // Append li element to ul element
            outputList.appendChild(reqListItem);

            // Append ul element to outputDiv
            outputDiv.appendChild(outputList);
        })

        // Create table element with style "display: none; margin-bottom: 12px;"
        const hiddenTable = document.createElement('table');
        hiddenTable.style.display = 'none';
        hiddenTable.style.marginBottom = '12px';

        // Create tbody and tr elements
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');

        // Create td element
        const td = document.createElement('td');
        const p = document.createElement('p');

        // Append p to td, td to tr, and tr to tbody
        td.appendChild(p);
        tr.appendChild(td);
        tbody.appendChild(tr);

        // Append tbody to table element
        hiddenTable.appendChild(tbody);

        // Append table element to outputDiv
        outputDiv.appendChild(hiddenTable);

        return outputDiv
    }

    static buildPointsObject(_tests, _penalties = 0){
        let points = {};

        _tests.forEach(function(_test){
            let pointId = TestBuilder.generateIdFromTestName(_test.name)
            
            points[pointId] = "";
        });

        if(_penalties != 0 && _penalties.length > 0){
            _penalties.forEach(function(_penalty){
                points[_penalty.id] = ""
            })
        }

        return points;
    }

    static buildTestValuesObject(_tests, _penalties = 0){
        let testValues = {};

        _tests.forEach(function(_test){
            let pointId = TestBuilder.generateIdFromTestName(_test.name)

            testValues[pointId] = _test.value
        });

        if(_penalties != 0 && _penalties.length > 0){
            _penalties.forEach(function(_penalty){
                testValues[_penalty.id] = _penalty.value
            })
        }

        return testValues
    }

    static generateIdFromTestName(_testName){
        // Convert the string to lower case
        let lowercaseName = _testName.toLowerCase();

        // Replace spaces with underscores
        let formattedName = lowercaseName.replace(/\s+/g, '_');

        // Append "id" to the end
        let finalResult = formattedName + '_id';

        return finalResult;
    }

    static generateRequirementIdFromName(_requirementName) {
        // Convert the string to lowercase
        const lowercaseStr = _requirementName.toLowerCase();

        // Replace spaces with underscores
        const result = lowercaseStr.replace(/\s+/g, '_');

        return result;
    }
}
