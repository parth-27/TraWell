import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CarCard from '../../../assets/CarCard/CarCard';
import 'react-tabs/style/react-tabs.css';

export const UserTabs = () => {
    return (
        <Tabs>
            <TabList>
                <Tab>Rented Cars</Tab>
                <Tab>Lended Cars</Tab>
                <Tab>History</Tab>
                <Tab>Requested Cars</Tab>
            </TabList>

            <TabPanel>
                <CarCard key={1} item={{
                    id: "fDObf2AeAP4",
                    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
                    title: "Chevrolet Coupe",
                    views: "Book",
                    published: "3 days ago"
                }} channel={"CNN"} />
            </TabPanel>
            <TabPanel>
                <CarCard key={1} item={{
                    id: "fDObf2AeAP4",
                    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
                    title: "Chevrolet Coupe",
                    views: "Book",
                    published: "3 days ago"
                }} channel={"CNN"} />
            </TabPanel>
            <TabPanel>
                <CarCard key={1} item={{
                    id: "fDObf2AeAP4",
                    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
                    title: "Chevrolet Coupe",
                    views: "Book",
                    published: "3 days ago"
                }} channel={"CNN"} />
            </TabPanel>
            <TabPanel>
                <CarCard key={1} item={{
                    id: "fDObf2AeAP4",
                    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
                    title: "Chevrolet Coupe",
                    views: "Book",
                    published: "3 days ago"
                }} channel={"CNN"} />
            </TabPanel>
        </Tabs>
    )
}
