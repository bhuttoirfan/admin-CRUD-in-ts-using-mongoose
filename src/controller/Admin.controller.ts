import { IADMIN } from '../types/document/IAdmin';
import { MainAdmin } from '../repositries/Admin.repositries';
import CustomeError from '../utills/error';
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse } from "tsoa";
import { SaveUpdateResADMIN } from '../types/Response/responses';
import { DeleteAdmin, GetAdmin, SaveReqADMIN,UpdateReqADMIN } from '../types/request/Admin.request';
@Route('admin')
@Tags('admin')
export class AdminController {
  constructor() { }
  @Post("/getAdmin")
  async getadmin(@Body() getreq:GetAdmin): Promise<SaveUpdateResADMIN> {

    console.log("Reached")

    const admin: IADMIN =<any> await new MainAdmin().getAdmin(getreq.id);
    if (admin === null) throw new CustomeError(404, 'Admin not found');
    return <SaveUpdateResADMIN>admin;
  }
  @Post('/saveadmin')
  async saveadmin(@Body() admin: SaveReqADMIN): Promise<SaveUpdateResADMIN> {
    const new_admin:IADMIN = await new MainAdmin().saveAdmin(<IADMIN>(admin));
    return <SaveUpdateResADMIN>(new_admin);
  }
  @Put('/updateadmin')
  async updateAdmin(@Body() admin: UpdateReqADMIN): Promise<SaveUpdateResADMIN> {
    const update_admin:IADMIN = await new MainAdmin().updateAdmin(<IADMIN>(admin));
    if (update_admin === null)
      throw new CustomeError(400, 'Admin not updated');
    return <SaveUpdateResADMIN>update_admin;
  }
  @Delete('/deleteadmin')
  @SuccessResponse("200","Admin deleted")
  async deletadmin(@Body() delreq: DeleteAdmin) {
    return await new MainAdmin().deletAdmin(delreq.id);
  }
  @Post('/getadminlist')
  async getadminList(): Promise<SaveUpdateResADMIN[]> {
    const admin: IADMIN[] = await new MainAdmin().getAdminslist();
    return <SaveUpdateResADMIN[]>(admin);
  }
}