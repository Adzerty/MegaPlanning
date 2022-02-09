import { IonGrid, IonRow, IonLabel, IonSkeletonText, IonCol, IonContent } from "@ionic/react"
import events from "events"
import { DevoirList } from "./Devoirs"
import './DevoirGrid.css';

function sortByDtstart(o: any, o2: any) {
  let dateO = Date.parse(o.date.toString());
  let dateO2 = Date.parse(o2.date.toString());
  return dateO - dateO2;
}

export const DevoirGrid : React.FC<{ isLoading : boolean, devoirs : DevoirList[] }> =  ({isLoading,devoirs}) =>{
	return (
		<div className="eventLaterContainer" >
		{!isLoading && devoirs.sort(sortByDtstart).map((devoir) =>
		  <IonGrid className="eventLater">
			<IonRow>
				<IonCol>
					<IonLabel className="label_event"> Intitulé : </IonLabel>
				</IonCol>
				<IonCol>
					<IonLabel className="label_event_now"> {devoir.title}</IonLabel>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonCol>
					<IonLabel className="label_event"> Date de rendu : </IonLabel>
				</IonCol>
				<IonCol>
					<IonLabel className="label_event_now">{new Date(devoir.date.toString()).toLocaleString("fr-FR", { weekday: 'long' })} {new Date(devoir.date.toString().slice(0,19)).toLocaleString()}</IonLabel>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonCol>
					<IonLabel className="label_event"> Tags : </IonLabel>
				</IonCol>
				<IonCol>
				{devoir.tags.map((tag)=>
					<IonLabel className="label_event_now">{tag}</IonLabel>
				)}     
				</IonCol>             
			</IonRow>
		  </IonGrid>
		)}
	  </div>
	)
}