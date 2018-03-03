import java.io.File;

import org.apache.tools.ant.Project;
import org.apache.tools.ant.taskdefs.Zip;
import org.apache.tools.ant.types.FileSet;

public class AntZip {
	private File zipFile = null;

	public AntZip(String distName) {
		zipFile = new File(distName);
	}

	public File compress(String dirName) {
		File srcdir = new File(dirName);
		if (!srcdir.exists())
			throw new RuntimeException(dirName + "不存在！");
		Project prj = new Project();
		Zip zip = new Zip();
		zip.setProject(prj);
		zip.setDestFile(zipFile);
		FileSet fileSet = new FileSet();
		fileSet.setProject(prj);
		fileSet.setDir(srcdir);
		zip.addFileset(fileSet);
		zip.execute();
		return zipFile;
	}

	public File compress(String dirName, String includeFileName) {
		File srcdir = new File(dirName);
		if (!srcdir.exists())
			throw new RuntimeException(dirName + "不存在！");
		Project prj = new Project();
		Zip zip = new Zip();
		zip.setProject(prj);
		zip.setDestFile(zipFile);
		FileSet fileSet = new FileSet();
		fileSet.setProject(prj);
		fileSet.setDir(srcdir);
		fileSet.setIncludes(includeFileName);
		zip.addFileset(fileSet);
		zip.execute();
		return zipFile;
	}

	public File compress(String dirName, String includeFileName, String[] excludeFileName) {
		File srcdir = new File(dirName);
		if (!srcdir.exists())
			throw new RuntimeException(dirName + "不存在！");
		Project prj = new Project();
		Zip zip = new Zip();
		zip.setProject(prj);
		zip.setDestFile(zipFile);
		FileSet fileSet = new FileSet();
		fileSet.setProject(prj);
		fileSet.setDir(srcdir);
		fileSet.setIncludes(includeFileName);
		for (String exclude : excludeFileName) {
			fileSet.setExcludes(exclude);
		}
		zip.addFileset(fileSet);
		zip.execute();
		return zipFile;
	}

	public static void main(String[] args) {
		AntZip zca = new AntZip("szhzipant");
		zca.compress("D:\\test", "me.*");
	}
}