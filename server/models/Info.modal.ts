import { Schema, model } from "mongoose";

export interface InfoDocument extends Document {
    fileNumber: string;
    subject: string;
    fromWhomReceived: string;
    dateOfLetters: Date;
    dateOfReceipt: Date;
    remarksComments: string;
    areaOfFiling: string;
}

const InfoSchema = new Schema({

    fileNumber: {
        type: String,
        required: true
    },

    subject: {
        type: String,
    },

    fromWhomReceived: {
        type: String,
    },

    dateOfLetters: {
        type: Date,
    },
    dateOfReceipt: {
        type: Date,
    },

    remarksComments: {
        type: String,
    },
    areaOfFiling: {
        type: String,
    },


},
    {
        timestamps: true,
    },
)

export const Info = model<InfoDocument>('Info', InfoSchema)
