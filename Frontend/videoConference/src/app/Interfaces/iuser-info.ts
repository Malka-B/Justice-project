export interface IUserInfo {
    participantId: number; //מזהה המשתתף בDB
    userId: string; // תז של המשתמש, מה שהזדהה בעת כניסתו למערכת
    userName: string; // השם שהכניס בעת כניסתו לדיון
    connectionId: string; // מזהה החיבור לדיון
    role: string; // תפקיד המשתתף,
    permission: string; //הרשאות המשתתף ADMIN/ REGULAR USER
}
