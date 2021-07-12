import xml from 'xml'
import {forEach} from "read-excel-file/modules/xml/dom";
import {element} from "prop-types";
import listOfPortsConst from "../config/consts/listOfPortsConst";
import listOfPurposesOfCallsConst from "../config/consts/listOfPurposesOfCallsConst";


const RanksOfRating = ['AbleSeaman', 'Agent', 'AsstFoodBevMngr', 'BarManager', 'BarService', 'Bosun', 'Cadet', 'Captain', 'CargoTechnician', 'CasinoStaff', 'ChiefCook', 'ChiefElectrician', 'ChiefHousekeeper', 'ChiefEngineer', 'ChiefMaster', 'ChiefMate', 'ChiefOfficer', 'ChiefPurser', 'ChiefSteward', 'ClassSurveyor', 'CSO', 'Cook', 'CraneOperator', 'CrewMember', 'CruiseDirector', 'CruiseStaff', 'DeckApprentice', 'DeckFitter', 'DeckOfficer', 'Deckhand', 'Doctor', 'Donkeyman', 'ElectricalEngineer', 'ElectricalOfficer', 'Electrician', 'EngineerCadet', 'EngineeringCrew', 'EngineFitter', 'Entertainment', 'FacilitiesCrew', 'FacilitiesManager', 'FirstAsstEngineer', 'FirstEngineer', 'FirstMate', 'FirstOfficer', 'Fitter', 'FourthOfficer', 'FoodBevMngr', 'FoodService', 'FourthAsstEngineer', 'Greaser', 'Hospitality', 'HotelDirector', 'HotelStaff', 'HousekeepingStaff', 'InformationTechnology', 'JuniorEngineer', 'LaundryMaster', 'Lifeboatman', 'Maitred', 'MarineCrew', 'MarketingRevenueMngr', 'Master', 'MasterFirstClassPilot', 'MateFirstClassPilot', 'Mechanic', 'MedicalStaff', 'Messman', 'Motorman', 'Oiler', 'Operator', 'OrdinarySeaman', 'Owner', 'Painter', 'Porter', 'Provision', 'ProvisionMaster', 'Pumpman', 'QMED', 'RadioOfficer', 'Reeferman', 'Repairman', 'RiddingCrew', 'SafetyAndSecurity', 'SecondAsstEngineer', 'SecondMate', 'SecondOfficer', 'SSO', 'StaffCaptain', 'Steward', 'Superintendent', 'Tankerman', 'ThirdAsstEngineer', 'ThirdMate', 'ThirdOfficer', 'ThirdParty', 'TruckMechanic', 'Tunnelman', 'UtilityPerson', 'VettingInspector', 'Welder', 'Wiper', 'YardPersonnel', 'Other']

function createXML(data) {

    if (dataCheck(data) === true) {
        let port = data.port;
        let crew = data.crew.rows;
        let portOfCall = listOfPortsConst.find(function(element) {
            return element.code === port.portOfCall;
        });

        let portOfArrival = listOfPortsConst.find(function(element) {
            return element.code === port.portOfArrival;
        });

        let lastPortOfCall = listOfPortsConst.find(function(element) {
            return element.code === port.lastPortOfCall;
        });
        let nextPortOfCall = listOfPortsConst.find(function(element) {
            return element.code === port.nextPortOfCall;
        });

        console.log("generatexmldata ", data);
        let ArrivalDepartureDraught;
        // let CrewList = [];
        // for (let i = 0; i < crew.length; i++) {
        //     let CrewMemberData = [];
        //     console.log("id type ", crew[i].ID_type);
        //     let RankOfRatingCode = "";
        //     if (crew[i].Rank_of_rating != null) {
        //         RankOfRatingCode = RanksOfRating.indexOf(crew[i].Rank_of_rating) + 1;
        //     }
        //     CrewMemberData.push({
        //         CrewIdDocument: [
        //             {IdDocument: crew[i].ID_type},
        //             {IdNumber: crew[i].ID_document_number},
        //             {IssueDate: crew[i].Issuing_state_of_identity_document},
        //             {ExpirationDate: crew[i].Expiry_date_of_identity_document},
        //         ]
        //     });
        //     CrewMemberData.push({
        //         Name: [
        //             {GivenName: crew[i].Given_name},
        //             {FamilyName: crew[i].Family_name},
        //         ]
        //     });
        //     CrewMemberData.push({Gender: crew[i].Gender});
        //     CrewMemberData.push({
        //         Duty: [
        //             {Code: RankOfRatingCode},
        //             {Text: crew[i].Rank_of_rating}
        //         ]
        //     });
        //     CrewMemberData.push({DateOfBirth: crew[i].date_of_birth});
        //     CrewMemberData.push({PlaceOfBirth: crew[i].Place_of_birth});
        //     CrewMemberData.push({CountryOfBirth: crew[i].Country_of_birth});
        //     CrewMemberData.push({Nationality: crew[i].Nationality});
        //     CrewMemberData.push({VisaNumber: crew[i].Visa_Residence_permit_number});
        //     CrewList.push({CrewMemberData});
        // }
        if (port.arrivalDeparture == 'Arrival') {
            ArrivalDepartureDraught = {
                ArrivalDraught: [
                    {ForeDraught: port.arrivalDraught.foreDraught},
                    {MidShipDraught: port.arrivalDraught.midShipDraught},
                    {Time: port.arrivalDraught.aftDraught},
                ]
            }

        } else {
            ArrivalDepartureDraught = {
                DepartureDraught: [
                    {ForeDraught: port.arrivalDraught.foreDraught},
                    {MidShipDraught: port.arrivalDraught.midShipDraught},
                    {Time: port.arrivalDraught.aftDraught},
                ]
            }
        }

        let EPCRequestBody = [];
        EPCRequestBody.push({VoyageNumber: port.voyageNumber});
        if(portOfCall){
            EPCRequestBody.push(   {
                VoyageDescription: [
                    {
                        PortCall: [
                            {
                                Port: [
                                    {Name: portOfCall.name},
                                    {Facility: port.portFacilityAtArrival},
                                    {CountryCode: portOfCall.countryCode},
                                    {UNLoCode: portOfCall.code}
                                ]
                            }]
                    }
                ]

            });
        }

        EPCRequestBody.push({ETAPortOfCall: port.ETAPortOfCall})
        EPCRequestBody.push({ETDPortOfCall: port.ETDPortOfCall})
        EPCRequestBody.push({ATAPortOfCall: port.ATAPortOfCall})
        EPCRequestBody.push({ATDPortOfCall: port.ATDPortOfCall})
        if (portOfArrival){
            EPCRequestBody.push( {
                PortOfArrival: [
                    {Name: portOfArrival.name},
                    {CountryCode: portOfArrival.countryCode},
                    {UNLoCode: portOfArrival.code},
                ]
            })
        }

        if (lastPortOfCall){
            EPCRequestBody.push( {
                LastPortOfCall: [
                    {Name: lastPortOfCall.name},
                    {CountryCode: lastPortOfCall.countryCode},
                    {UNLoCode: lastPortOfCall.code}
                ]
            })
        }

        if (nextPortOfCall){
            EPCRequestBody.push({
                NextPortOfCall: [
                    {Name: nextPortOfCall.name},
                    {CountryCode: nextPortOfCall.countryCode},
                    {UNLoCode: nextPortOfCall.code}
                ]
            })
        }

        EPCRequestBody.push( {Anchorage: port.callAnchorage})
        EPCRequestBody.push(  {
            EntryPosition: [
                {
                    Position: [
                        {Latitude: port.position.latitude},
                        {Longitude: port.position.longitude},
                        {Time: port.position.time}
                    ]
                }]
        })
        EPCRequestBody.push({CargoOverview: port.cargoDescription});
        EPCRequestBody.push({
            NameOfMaster: [
                {GivenName: port.nameOfMaster.givenName},
                {FamilyName: port.nameOfMaster.familyName},

            ]
        })
        for (let i = 0; i <port.callPurpose.length; i++) {
            if (port.callPurpose[i]!=""){
                let callPurpose = listOfPurposesOfCallsConst.find(function (element) {
                    return element.callPurposeCode = port.callPurpose[i];
                })
                console.log("call purposes ", port.callPurpose[i])
                EPCRequestBody.push(   {
                    CallPurpose: [
                        {CallPurposeCode: callPurpose.callPurposeCode},
                        {CallPurposeText: callPurpose.callPurposeText}
                    ]
                })
            }

        }
        EPCRequestBody.push( {AirDraught: port.airDraught})
        EPCRequestBody.push(ArrivalDepartureDraught)
        EPCRequestBody.push(  {
            Agent: [
                {Company: port.agent.company},
                {
                    ContactNumbers: [
                        {BusinessTelephone: port.agent.contactNumbers.businessTelephone},
                        {MobileTelephone: port.agent.contactNumbers.mobileTelephone},
                        {Telefax: port.agent.contactNumbers.telefax},
                        {Email: port.agent.contactNumbers.EMail},
                    ]
                },
            ]
        });
        EPCRequestBody.push({
            PersonsOnBoard: [
                {NumberOfPersonsOnBoard: port.personsOnBoard.numberOfPersonsOnBoard},
                {Passengers: port.personsOnBoard.passengers},
                {Crew: port.personsOnBoard.crew},
            ]
        });
        EPCRequestBody.push( {Stowaways: port.stowaways});
        EPCRequestBody.push({PeriodOfStay: port.periodOfStay});
        // EPCRequestBody.push( {CrewList: CrewList})

        console.log("POC ",port.portOfCall)
        let xmlValue = xml([{
            EPCMessage: [{
                EPCMessageHeader: [
                    {ArrivalDeparture: port.arrivalDeparture}
                ]
            },
                {
                    EPCRequestBody: EPCRequestBody
                }
            ]
        }], {declaration: true});
        downloadXMLfile(xmlValue);
    }
}

let downloadXMLfile = (xmlValue) => {
    let data = xmlValue;
    let filename = `XML config ${new Date()}.xml`
    console.log('downloadXMLfile')
    var file = new Blob([data], /*{type: type}*/);

    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);

}

let dataCheck = (data) => {
    let port = data.port
    if (port.arrivalDeparture==''){
        alert("Please, fill in the required field 'Departure/Arrival' in Port infomation")
        return false
    }
    if (port.portOfCall==''){
        alert("Please, fill in the required field 'Departure/Arrival' in Port infomation")
        return false
    }
    // for (let i = 0; i < data.crew.rows.length; i++) {
    //     let row = data.crew.rows[i]
    //     if (row.Family_name == null) {
    //         alert("Please, fill in the required field 'Family name' in Crew list")
    //         return false
    //     }
    //     if (row.Given_name == null) {
    //         alert("Please, fill in the required field 'Given name' in Crew list")
    //         return false
    //     }
    //     if (row.Rank_of_rating == null) {
    //         alert("Please, fill in the required field 'Rank of rating' in Crew list")
    //         return false
    //     }
    //     if (row.Nationality == null) {
    //         alert("Please, fill in the required field 'Nationality' in Crew list")
    //         return false
    //     }
    //     if (row.Country_of_birth == null) {
    //         alert("Please, fill in the required field 'Country of birth' in Crew list")
    //         return false
    //     }
    //     if (row.Place_of_birth == null) {
    //         alert("Please, fill in the required field 'Place of birth' in Crew list")
    //         return false
    //     }
    //     if (row.date_of_birth == null) {
    //         alert("Please, fill in the required field 'date of birth' in Crew list")
    //         return false
    //     }
    //     if (row.ID_type == null) {
    //         alert("Please, fill in the required field 'ID type' in Crew list")
    //         return false
    //     }
    //     if (row.ID_document_number == null) {
    //         alert("Please, fill in the required field 'ID document number' in Crew list")
    //         return false
    //     }
    // }
    return true
}

export default createXML;