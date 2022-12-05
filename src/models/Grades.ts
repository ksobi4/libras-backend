import 'reflect-metadata';
import admin from 'firebase-admin';
import { getTimeStamp } from '../utils/time';
import { jsonObject, jsonMember, TypedJSON, jsonArrayMember } from 'typedjson';
import logger from '../utils/logger';


@jsonObject
export class Grade {
  @jsonMember(String)
  id: string;
  @jsonMember(String)
  value: string;
  @jsonMember(String)
  date: string;
  @jsonMember(String)
  teacher: string;
  @jsonMember(String)
  lesson: string;
  @jsonMember(String)
  multiplier: string;
  @jsonMember(String)
  user: string;
  @jsonMember(String)
  comment: string;
  @jsonMember(String)
  category: string;
  @jsonMember(Boolean)
  isHasDetails: boolean;


  constructor(
    id: string, 
    value:string, 
    date:string,
    teacher:string,
    lesson:string,
    multiplier:string,
    user:string,
    comment:string,
    category:string,
    isHasDetails:boolean,
    ) {
    this.id = id;
    this.value = value;
    this.date = date;
    this.teacher = teacher;
    this.lesson = lesson;
    this.multiplier = multiplier;
    this.user = user;
    this.comment = comment;
    this.category = category;
    this.isHasDetails = isHasDetails;

  }

  public static fromJson(obj: Object): Grade {
    return gradeSerializer.parse(obj) as Grade;
  }

  public toJson(): any {
    return gradeSerializer.stringify(this);
  }
}

@jsonObject
export class Term {
  @jsonArrayMember(Grade)
  grades: Grade[];


  constructor(grades: Grade[]) {
    this.grades = grades;

  }

  public static fromJson(obj: Object): Term {
    return termSerializer.parse(obj) as Term;
  }

  public toJson(): any {
    return termSerializer.stringify(this);
  }
}

@jsonObject
export class Subject {
  @jsonArrayMember(Term)
  terms: Term[];
  @jsonMember(String)
  name: string;

  constructor(terms: Term[], name:string) {
    this.terms = terms;
    this.name = name;
  }

  public static fromJson(obj: Object): Subject {
    return subjectSerializer.parse(obj) as Subject;
  }

  public toJson(): any {
    return subjectSerializer.stringify(this);
  }
}

@jsonObject
export class Grades {
  @jsonArrayMember(Subject)
  subjects: Subject[];
  @jsonMember(String)
  userId:string;

  timestamp:admin.firestore.Timestamp;

  constructor(subjects: Subject[], userId:string) {
    this.subjects = subjects;
    this.timestamp = getTimeStamp(),
    this.userId = userId;
  }

  public static fromJson(obj: any): Grades {
   let save = obj.timestamp;
    let grades = gradesSerializer.parse(obj) as Grades;
    grades.timestamp = save;
    return grades;
  }

  public toJson(): any {
    let json = JSON.parse(gradesSerializer.stringify(this));
    json['timestamp'] = this.timestamp;
    return json;

  }
}





const gradesSerializer = new TypedJSON(Grades); 
const subjectSerializer = new TypedJSON(Subject); 
const termSerializer = new TypedJSON(Term); 
const gradeSerializer = new TypedJSON(Grade); 