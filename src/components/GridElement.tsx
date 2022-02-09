import { IonRow, IonCol, IonLabel, IonSkeletonText } from "@ionic/react"

function randomWidth(minSize : number , interval : number) : string {
    const num = minSize + ( Math.random() * interval )
    return num + 'px';
}

export const GridElement : React.FC<{name : string , value : string | string[], isLoading : boolean}> = ({ name , value, isLoading }) => {
    return (
        <IonRow>
            <IonCol>
                { isLoading ?
                <IonSkeletonText animated style={{ width: randomWidth(30,30) , height: '16px' }} />:   
                <IonLabel className="label_event"> {name} </IonLabel>
                }                
            </IonCol>
            <IonCol>
                { isLoading ?
                <IonSkeletonText animated style={{ width: randomWidth(30,100) , height: '16px' }} />:
                (typeof(value) === "object") ? 
                (value as string[]).map((elt) => 
                    <IonLabel className="label_event_now"> {elt} </IonLabel>
                ) : 
                    <IonLabel className="label_event_now"> {value} </IonLabel>
                }
            </IonCol>
        </IonRow>
    )
}  