// Colors corresponding with grade values
const VALUE_COLORS = {
    "poor" : "rgb(161, 0, 0)",
    "fair" : "rgb(206, 134, 0)",
    "good" : "rgb(0, 194, 0)",
    "exce" : "rgb(0, 199, 199)"
}

class PageUtils {

    static updateFeedback(_checkedScore, _points, _gradeWeights, _pointsValues){
        
        // Retrieve overall grade
        let grade = PageUtils.getOverallGrade(_points, _pointsValues)
        
        // Use the overall grade to generate introduction status
        // and apply that to the intro statement text area
        document.querySelector('#intro_statement').value = this.getIntroStatus(grade)

        // Then retrieve the value of the text area
        let introStatement = document.querySelector('#intro_statement').value

        // And update all the page HTML
        PageUtils.updateGrade(grade)
        PageUtils.updateIntroductionStatement(introStatement)
        PageUtils.updateFormColumnScore(_gradeWeights, _pointsValues, _points)
        PageUtils.updateOutputColumnScore(_gradeWeights, _pointsValues, _points)
        PageUtils.updateOutputColumnRequirements(_checkedScore)
        PageUtils.updateHtmlOutput()
    }

    static updateOutputStudentName(_name){
        if(_name === null || _name.length === 0){
            document.querySelector('.rich-output .student').textContent = ""
        } else {
            document.querySelector('.rich-output .student').textContent = _name + ","
        }
    }

    static updateIntroductionStatement(_text){
        if(_text === null || _text.length === 0){
            document.querySelector('.rich-output .intro').textContent = ""
        } else {
            document.querySelector('.rich-output .intro').textContent = _text
        }
    }

    static updateVideoUrlEmbed(_url){
        if(_url !== null && _url.length > 0){
            let youtubeEmbed = "";
            
            youtubeEmbed += `<hr />`
            youtubeEmbed += `<p>Please watch this video below for some additional feedback:</p>`
            youtubeEmbed += `<iframe width="560" height="315" src="https://www.youtube.com/embed/${PageUtils.getYouTubeId(_url)}"`
            youtubeEmbed += `title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;` 
            youtubeEmbed += `clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

            document.querySelector('.video-feedback').innerHTML = youtubeEmbed
            document.querySelector('.video-feedback').style.display = "block"
        } else {
            document.querySelector('.video-feedback').innerHTML = ""
            document.querySelector('.video-feedback').style.display = "none"
        }
    }

    /**
     * Updates the HTML class of the element corresponding with the rubric _column 
     * with the points from the correponding points value category (eg. "GOOD", "POOR", etc.)
     * 
     * @param {string} _column Rubric column being evaluated
     * @param {number} _points Field of the points object that corresponds with the rubric column
     */
    static updateFormColumnScore(_gradeWeights, _pointsValues, _points){
        Object.keys(_points).forEach(_column => {

            if(_points[_column] != null){
                var score = document.querySelector(`li.${_column} .score`)

                if(score != null){
                    // Percentage of points out of total available points per passed rubric column
                    score.textContent = `${_points[_column] * _pointsValues[_column]}/${_pointsValues[_column]}`

                    switch (_points[_column]){
                        case _gradeWeights.POOR:
                            score.className = "score poor"
                            break

                        case _gradeWeights.FAIR:
                            score.className = "score fair"
                            break

                        case _gradeWeights.GOOD:
                            score.className = "score good"
                            break

                        case _gradeWeights.EXCE:
                        default:
                            score.className = "score excellent"
                            break
                    }
                } else {
                    console.log(`Score element not found for ${_column}!`)
                }

            }
        })
    }

    static updateOutputColumnRequirements(_checked){
        console.log(_checked);

        if(_checked.length > 0 && _checked != null){
            const listItems = Array.from(document.querySelectorAll(`.output-list li`))

            listItems.forEach(_item => {
                if(_checked.includes(_item.className)){
                    _item.style = `color: rgb(151, 151, 151); font-weight: normal; margin-top: 4px`
                    _item.getElementsByTagName("span")[0].style = `display: none`
                } else {
                    _item.style = `color: rgb(74, 145, 57); font-weight: bold; margin-top: 4px` // TODO: Maybe storage these color values
                    _item.getElementsByTagName("span")[0].style = `display: inline`
                }
            })
        } else {
            const listItems = Array.from(document.querySelectorAll('.output-list li'))

            listItems.forEach(_item => {
                _item.style = `color: rgb(74, 145, 57); font-weight: bold; margin-top: 4px` // TODO: Maybe storage these color values
                _item.getElementsByTagName("span")[0].style = `display: inline`
            })
        }
    }

    static updatePenalties(_checked, _penalities){
        if(_checked.length > 0 && _penalities.length > 0 && _checked != null && _penalities != null){
            _penalities.forEach(function(_penalty){
                if(_checked.includes(_penalty.id)){

                }
            })
        }
    }
    
    /**
     * Updates additional feedback table with corresponding feedback from form.
     * 
     * @param {string} _column ID of corresponding rubric column
     */
    static updateOutputColumnFeedback(_column){
        const comment = document.querySelector(`.${_column} #${_column}_comment`).value

        if(comment.length > 0){
            document.querySelector(`.${_column}-output table`).style.display = "table"

            document.querySelector(`.${_column}-output table p`).innerHTML = comment
        } else {
            document.querySelector(`.${_column}-output table`).style.display = "none"
        }
    }

    static updateOutputColumnScore(_gradeWeights, _pointsValues, _points){
        Object.keys(_points).forEach(_column => {

            // ONLY run for structure
            // TODO: Change this when everything is more fleshed out.

            if(_points[_column] != null){
                // Header "score" element
                let scoreElement = document.querySelector(`.${_column}-output .output-header span`)

                if(scoreElement != null){
                    // Set the score to X out of Y points
                    scoreElement.textContent = `${_points[_column] * _pointsValues[_column]}/${_pointsValues[_column]}`
                    
                    // Select the RGB color value that corresponds with point percentage
                    switch(_points[_column]){
                        case _gradeWeights.POOR:
                            scoreElement.style = `color: ${VALUE_COLORS.poor}`
                            break

                        case _gradeWeights.FAIR:
                            scoreElement.style = `color: ${VALUE_COLORS.fair}`
                            break

                        case _gradeWeights.GOOD:
                            scoreElement.style = `color: ${VALUE_COLORS.good}`
                            break

                        case _gradeWeights.EXCE:
                        default:
                            scoreElement.style = `color: ${VALUE_COLORS.exce}`
                            break
                    }
                }
            }
        });
    }

    static updateHtmlOutput(){
        const outputHtml = document.querySelector(".rich-output").innerHTML

        document.querySelector(".html-output pre").textContent = outputHtml
    }

    static updateOutputOnCheckedChange(){

    }

    static updateGrade(_grade){
        document.querySelector('.grade').textContent = _grade
    }

    /**
     * Generates an SVG from the pathes store in ICONS. Loops through the keys of points, and adds
     * the SVG to the header of the column output.
     * */
    static insertSvgHeaderIcons(_icons){
        Object.keys(points).forEach(_column => {
            const SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            SVG.style.width = "24px"
            SVG.style.height = "24px"
            SVG.style.position = "relative"
            SVG.style.top = "6px"
            SVG.style.marginRight = "6px"
            SVG.setAttribute("viewBox", "0 0 24 24")

            const PATH = document.createElementNS("http://www.w3.org/2000/svg","path")
            PATH.setAttributeNS(null, "fill", "currentColor")
            PATH.setAttributeNS(null, "d", _icons[_column])

            SVG.appendChild(PATH)

            //fill = currentColor
            document.querySelector(`.${_column}-output .output-header`).prepend(SVG)
        })
    }

    static getYouTubeId(_url){
        let id = ''

        _url = _url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)

        if(_url[2] !== undefined) {
            id = _url[2].split(/[^0-9a-z_\-]/i);
            id = id[0];
        } else {
            id = _url;
        }
        
        return id;
    }

    static getIntroStatus(_grade){
        let status = ""
        
        switch(true){
            case (_grade > 92):
                status = "Excellent job on this assignment!"
                break;
            case (_grade > 80):
                status = "Great job on this assignment!"
                break;
            case (_grade > 69):
                status = "Good job on this assignment."
                break;
            default: 
                status = "Good work on this assignment."
        }
        return status
    }

    static copyOutputHtml() {
        console.log("Click!")

        const el = document.createElement("textarea");
        el.value = document.querySelector('.rich-output').innerHTML;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    }

    static getOverallGrade(_points, _pointsValues){
        let grade = 0;

        // The grade for each column is determined by the percentage earned, 
        // multiplied by the total available points. These are then added together.
        Object.keys(_points).forEach(_column =>{
            grade += _points[_column] * _pointsValues[_column]
        })

        return grade;
    }
}
