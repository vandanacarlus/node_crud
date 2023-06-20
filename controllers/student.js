const express=require("express")
const mongoose = require("mongoose")
const student = require("../models/studentdata.js")
const router = express.Router();
const createStudent = async (req, res)=>{
    console.log("request from post man " + req.body)
    const newStudent  =new student ({
        name:req.body.name,
        roll:req.body.roll,
        class:req.body.class,
registered_on:req.body.registered_on,
subjects:req.body.subjects,
gender:req.body.gender,
contact_no:req.body.contact_no,
    }) 
    try{
        await newStudent.save()
        res.status(201).json(newStudent)
    }

    catch(error){
        res.status(400).json({message: error.message})
    }}

    const getStudents = async (req, res) => {
        try {
          const students = await student.find();
      
          res.status(200).json(students);
        }
        catch(error) {
          res.status(400).json({ message: error.message });
        }
      }
      
      const getSpecificStudent = async (req, res) => {
        const _id = req.params._id;
        try {
          const stud = await student.findOne({_id: _id});
      
          res.status(200).json(stud);
        }
        catch(error) {
          res.status(400).json({ message: error.message });
        }
      }
      
      const updateStudent = async (req, res) => {
        const roll = req.params.roll;
      
        try {
          await student.findOneAndUpdate({
            roll: roll,
          },
          {
       // $push:{ subjects: "maths"}
       // $pop:{ subjects: -1}
          // name:req.body.name
          
          //$addToSet:{subjects:[req.body.subjects[0],req.body.subjects[1]]}
           $addToSet:{subjects:req.body.subjects}
          }
          )
      
          res.status(201).json({roll: roll});
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      };
      
      const deleteStudent = async (req, res) => {
        const roll = req.params.roll;
      
        try {
          await student.findOneAndRemove({
            roll: roll,
          });
      
          res.status(201).json({roll: roll});
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      };
      
      module.exports.createStudent = createStudent;
      module.exports.getStudents = getStudents;
      module.exports.getSpecificStudent = getSpecificStudent;
      module.exports.updateStudent = updateStudent;
      module.exports.deleteStudent = deleteStudent;
 