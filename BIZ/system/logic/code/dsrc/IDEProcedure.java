import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.justep.common.SystemUtils;
import com.justep.filesystem.FileSystem;
import com.justep.system.context.ContextHelper;


public class IDEProcedure {
	public static final String IDE_PATH_PERM = "ide.path.perm";	
	
	public static JSONArray queryPathPermissionForIDE(){
		JSONArray result = new JSONArray();
		List<Object> items = ContextHelper.getOperator().getSemanticPermission("ide.path.perm", null);
		for (Object item : items){
			if (item!=null){
				String path = item.toString();
				if (SystemUtils.isNotEmptyString(path)){
					String[] values = new String[]{
						"/UI2/" + path,
						"/UI2/" + path + FileSystem.EXT,
						"/BIZ/" + path,
						"/BIZ/" + path + FileSystem.EXT
					};
					for (String value : values){
						if (!result.contains(value)){
							result.add(value);
						}
					}
					
				}
			}
		}
		return result;
	}
	
	
}