import { ResponseLoadData, VP_BPM } from 'src/beans/VP_BPM';
import { Info } from 'src/beans/Workflow';
import { ws_beans_header } from 'src/beans/WS_Beans';
import { environment } from 'src/environments/environment';
import {AnexoService} from '../app/app.service'
import { getFormPresentation } from './Form_Presentation';
import getVP from './Get_VP_BPM';

const STEP = environment.tarefa();

declare var removeData: any;
declare var rollbackData: any;

async function loadData(vp: VP_BPM, info: Info, anexoService: AnexoService): Promise<ResponseLoadData> {
  var rld: ResponseLoadData = { initial: 1, tabs: [1, 2, 3], vp };

  rld.vp.user_fullName = (await info.getUserData()).fullname;

  const ptd = await info.getPlatformData();
  rld.vp.token = `bearer ${ptd.token.access_token}`;
  ws_beans_header.headers!['Authorization'] = rld.vp.token;

  const ipv = await info.getInfoFromProcessVariables();
  if (STEP !== environment.s1_etapa1) {
    var map: Map<any, any> = new Map();
    for (let i of ipv) map.set(i.key, i.value);
    rld.vp = getVP(rld.vp, map);
  }
  rld = getFormPresentation(rld);
  anexoService.anexoLoad(rld);

  return rld;
}

function saveData(vp: VP_BPM): any {
  return { formData: vp };
}

function rollback(data: any, info: any): any {
  if (info.isRequestNew()) return removeData(data.processInstanceId);
  return rollbackData(data.processInstanceId);
}

export { loadData, saveData, rollback };
