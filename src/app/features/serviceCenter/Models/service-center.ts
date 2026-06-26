export enum CenterStatus {
  Inactive = 0,
  Active = 1
}

export class ServiceCenter {
  serviceCenterID: string = ''; 
  ownerId: string = '';
  centerName: string = '';
  flatNumber: string = '';
  street: string = '';
  nearestLandmark: string = '';
  city: string = '';
  state: string = '';
  pincode: string = '';
  contact: string = '';
  serviceDescription: string = '';
  capacity: number = 0;
  createdAt: Date = new Date();
  status: CenterStatus = CenterStatus.Active;
  fullAddress: string = '';
}
