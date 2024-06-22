import { HttpMethod } from '@common/enums/http-method.enum';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

interface IMasterReportController {
  getMasterReportStudentsData();

  getMasterReportCourseData();

  getMasterReportFacultyData();

  getMasterReportUniversityData();

  getExcelReportFile();

  getGroupsForFront();

  getColumnsForFront();
}

@Controller()
export class MasterReportController implements IMasterReportController {
  constructor() {}

  @MessagePattern({
    url: '/masterReport/masterReportData',
    method: HttpMethod.GET,
  })
  async getMasterReportStudentsData() {}

  @MessagePattern({
    url: '/masterReport/masterReportCourseData',
    method: HttpMethod.GET,
  })
  async getMasterReportCourseData() {}

  @MessagePattern({
    url: '/masterReport/masterReportFacultyData',
    method: HttpMethod.GET,
  })
  async getMasterReportFacultyData() {}

  @MessagePattern({
    url: '/masterReport/masterReportUniversityData',
    method: HttpMethod.GET,
  })
  async getMasterReportUniversityData() {}

  @MessagePattern({
    url: '/masterReport/excelReportFile',
    method: HttpMethod.GET,
  })
  async getExcelReportFile() {}

  @MessagePattern({ url: '/masterReport/groupsNames', method: HttpMethod.GET })
  async getGroupsForFront() {}

  @MessagePattern({ url: '/masterReport/columnsFlag', method: HttpMethod.GET })
  async getColumnsForFront() {}
}
