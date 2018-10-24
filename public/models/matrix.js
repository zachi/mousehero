import utils from "./utils.js"
import settings from "./settings.js"


class matrix {
    constructor(cells) {
        this._stimuli = [
            [],
            [],
            [],
            []
        ];
        this.imageName = settings.imageFolderPath + cells[1].textContent;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {

                this._stimuli[i].push({
                    type: cells[i * 4 + j + 2].textContent,
                    gender: "UNKNOWN",
                    name: (i * 4 + j).toString()
                });

            }

        }
        // this.imageName = imageName;
        // this._stimuli = [
        //     [{ type: "aversive", gender: "male", name: "11m" }, { type: "neutral", gender: "male", name: "21m" }, { type: "aversive", gender: "female", name: "31m" }, { type: "aversive", gender: "female", name: "41" }],
        //     [{ type: "neutral", gender: "male", name: "12f" }, { type: "aversive", gender: "female", name: "22m" }, { type: "neutral", gender: "female", name: "322m" }, { type: "aversive", gender: "male", name: "42" }],
        //     [{ type: "neutral", gender: "male", name: "13m" }, { type: "aversive", gender: "female", name: "23m" }, { type: "neutral", gender: "female", name: "34m" }, { type: "aversive", gender: "male", name: "43" }],
        //     [{ type: "neutral", gender: "male", name: "14m" }, { type: "aversive", gender: "female", name: "24m" }, { type: "neutral", gender: "female", name: "44m" }, { type: "aversive", gender: "male", name: "44" }]
        // ];
    }

    get stimuli() {
        return this._stimuli;
    }

    getStimulusByScreenCoordinates(x, y) {
        if (x < 0 || y < 0)
            return {
                "type": "blank",
                "name": "blank"
            };
        var matrixIndexX = Math.floor(x / 225);
        var matrixIndexY = Math.floor(y / 225);
        if (matrixIndexX >= this._stimuli.length || matrixIndexY >= this._stimuli.length)
            return {
                "type": "blank",
                "name": "blank"
            };
        try {
            return this._stimuli[matrixIndexY][matrixIndexX];
        } catch {
            debugger;
        }
    }

    getDomElement() {
        if (!this.domElement)
            this.loadElement();
        return this.domElement;
    }

    loadElement() {
        if (!this.domElement)
        {    
            this.domElement = utils.compileTemplateToDomElement("matrix-template", {
                name: this.imageName
            });
        }
    }
}
export default matrix;