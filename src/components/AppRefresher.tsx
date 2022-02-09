import { RefresherEventDetail } from "@ionic/core";
import { IonRefresher, IonRefresherContent } from "@ionic/react";
import React from "react";

export const AppRefresher: React.FC<{ onRefresh : (event: CustomEvent<RefresherEventDetail>) => void }> =  ({onRefresh}) => {
	return (
		<IonRefresher slot="fixed" onIonRefresh={onRefresh}>
			<IonRefresherContent>
			</IonRefresherContent>
		</IonRefresher>
	)
}