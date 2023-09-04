export interface createVendorInput { 
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface loginVendorInput { 
    email: string;
    password: string;
}

export interface JwtPayload {
    id: string
}

export interface EditVendorInput { 
    name: string;
    address: string;
    phone: string;
    foodType: [string];
}