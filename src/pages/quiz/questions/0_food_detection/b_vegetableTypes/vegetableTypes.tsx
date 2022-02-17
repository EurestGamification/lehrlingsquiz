import React from "react";
import { IFoodDetectionProps } from "../foodDetection";
import "./vegetableTypes.scss";
import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";

interface VegetableTypesProps
    extends IFoodDetectionProps { }

const VegetableTypes: React.FC<VegetableTypesProps> =
    inject(quizStore.storeKey)(
        observer(() => {
            return (
                <div className="vegetableTypes">
                    <p className="vegetableTypes__heading">Ordne das richtige Gemüse zu.</p>
                    <button onClick={() => quizStore.setCurrentQuizStep(quizStore.currentQuizStep + 1)}>
                        Weiter
                    </button>
                </div>
            );
        })
    );

export default VegetableTypes;