// export class MildQr{
//   constructor(
//     public qr
//   ){}
// }
export class Mild{
  constructor(
    public quantity: number = 0,
    public pieces: string = '',
    public qrCode: [],
    public date: Date = new Date(),
    public zs: string = '',
    public as: string = '',
    public village: string = '',
    public depot: string = '',
    public user: [],
  ){}
}
