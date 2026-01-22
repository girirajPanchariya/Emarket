  import mongoose from "mongoose";

  const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
      phone:{
          type:String,
          required:true,
      },
      SalingBook:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Prodect"
      },
    profile:[{
      image:{
          type:String,

      },
      address:[{
          
      city:{
          type:String,
      },
      state:{
          type:String,
      },  
      country:{
          type:String,    
      },
      vilaage:{
          type:String,
      },
      pincode:{
          type:String,        
      }

  }
  ]
    }]
  },{  timestamps: true,});

  export const UserModel = mongoose.model('User',userSchema);
