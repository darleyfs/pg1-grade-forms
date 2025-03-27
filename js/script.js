import { PageUtils } from './PageUtils.js';
import { TestBuilder } from './TestBuilder.js';

const GRADE_WEIGHTS = {
    "POOR" : 0,
    "FAIR" : 0.45,
    "GOOD" : 0.80,
    "EXCE" : 1
}

// "d" values for the SVG paths of the output headers
const ICONS = {
    "t01" : `M1.5,4V5.5C1.5,9.65 3.71,13.28 7,15.3V20H22V18C22,15.34 16.67,14 14,14C14,14 13.83,14 13.75,14C9,14 5,10 5,5.5V4M14,4A4,4 0 0,0 10,8A4,4 0 0,0 14,12A4,4 0 0,0 18,8A4,4 0 0,0 14,4Z`,
    "t02" : `M13,19V16H21V19H13M8.5,13L2.47,7H6.71L11.67,11.95C12.25,12.54 12.25,13.5 11.67,14.07L6.74,19H2.5L8.5,13Z`,
    "t03" : `M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21`,
    "t04" : `M13,19V16H21V19H13M8.5,13L2.47,7H6.71L11.67,11.95C12.25,12.54 12.25,13.5 11.67,14.07L6.74,19H2.5L8.5,13Z`,
    "t05" : `M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21`,
    "t06" : `M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z`,
    "t07" : `M14,13V17H10V13H7L12,8L17,13M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z`,
    "t08" : `M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z`,
    "t09" : `M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z`,
    "t10" : `M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z`
}

let checkedScore = []


document.addEventListener('DOMContentLoaded', async function () {
    // Intializers
    let tests = await loadJSON(TEST_PATH)
    let penalties = await loadJSON(PENALTY_PATH)

    // Earned point values for rubric columns
    let points = TestBuilder.buildPointsObject(tests)

    // Total points available for each column
    const pointsValues = TestBuilder.buildTestValuesObject(tests)

    var elems = document.querySelectorAll('select')
    var instances = M.FormSelect.init(elems, null)

    var elems = document.querySelectorAll('.collapsible')
    var instances = M.Collapsible.init(elems, null)

    TestBuilder.buildRequirements(tests);
    TestBuilder.buildPenalties(penalties);
    TestBuilder.buildTestResults(tests);

    // Checkboxes
    var checkboxes = document.querySelectorAll("input[type=checkbox]")

    // Use Array.forEach to add an event listener to each checkbox.
    checkboxes.forEach(function (_checkbox) {
        _checkbox.addEventListener('change', function(){
            checkedScore =
                Array.from(checkboxes)          // Convert checkboxes to an array to use filter and map.
                    .filter(i => i.checked)     // Use Array.filter to remove unchecked checkboxes.
                    .map(i => i.value)          // Use Array.map to extract only the checkbox values from the array of objects.

                    console.log(`Checked changed!\n${checkedScore}`)


            let i = 0;

            // Check all of the tests and apply the points
            for(const key in points){

                // This is super sloppy but a temporary fix
                points[key] = evaluateTest(key, tests[i].requirements);
                i++;

                // points[key] = evaluateTest(key);
            }

            // Update the page HTML
            PageUtils.updateFeedback(checkedScore, points, GRADE_WEIGHTS, pointsValues)
        });
    });

    // Update output student name
    document.querySelector('#student_name').addEventListener('change', function(e){
        PageUtils.updateOutputStudentName(e.target.value)
    })

    // Update output student name
    document.querySelector('#intro_statement').addEventListener('change', function(e){
        PageUtils.updateIntroductionStatement(e.target.value)
    })


    // Update embedded feedback video
    document.querySelector('#video_url').addEventListener('change', function(e){
        PageUtils.updateVideoUrlEmbed(e.target.value)
    })

    // Update textarea feedback
    let textareas = Array.from(document.getElementsByTagName('textarea'))

    textareas.forEach(_textarea => {
        _textarea.addEventListener('change', function(e){
            const columnId = e.target.id.split("-")

            PageUtils.updateOutputColumnFeedback(columnId[0]);
        });
    })

    document.querySelector('.copy-html').addEventListener('click', function(){
        PageUtils.copyOutputHtml()
    });

    //PageUtils.insertSvgHeaderIcons(ICONS, points)

});

function evaluateTest(_id, _requirements){
    // This is sloppy but it will get the job done for now
    
    // TODO: I think the solution here would be to give each requirement a "level"
    // property and then to use the groupBy method here?
    // TODO 2: Do this as a data property. Generate the element with one.
    // TODO 3: Just going to have to back it into the ID and then parse it
    let requirement = TestBuilder.generateRequirementIdFromName(_requirements[0].name);

    let elementId = _id + '-' + requirement

    if([elementId].some(element => checkedScore.includes(element))){
        return GRADE_WEIGHTS.POOR
    }

    return GRADE_WEIGHTS.EXCE
}

let onCheckedChangeListener = function(_checkboxes){
    checkedScore =
        Array.from(_checkboxes)          // Convert checkboxes to an array to use filter and map.
            .filter(i => i.checked)     // Use Array.filter to remove unchecked checkboxes.
            .map(i => i.value)          // Use Array.map to extract only the checkbox values from the array of objects.

            console.log(`Checked changed!\n${checkedScore}`)

    // Check all of the tests and apply the points
    for(const key in points){
        points[key] = evaluateTest(key);
    }

    // Update the page HTML
    PageUtils.updatePage(checkedScore, points, GRADE_WEIGHTS, POINTS_VALUES)

    console.log(points)
}

function loadJSON(_path) {
    return new Promise((resolve, reject) => {
        // Assuming loadJSON is an asynchronous function, use fetch or another async mechanism
        // For example, using fetch:
        fetch(_path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${_path}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}
