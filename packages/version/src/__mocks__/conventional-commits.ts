import path from 'path';
import semver from 'semver';
const fs = jest.requireActual('fs-extra');

const applyBuildMetadata = jest.fn().mockName('applyBuildMetadata');
const mockRecommendVersion = jest.fn().mockName('recommendVersion');
const mockUpdateChangelog = jest.fn().mockName('updateChangelog');

applyBuildMetadata.mockImplementation((version, buildMetadata) => {
  if (buildMetadata) {
    return `${version}+${buildMetadata}`;
  }
  return version;
});

mockRecommendVersion.mockImplementation((node) => semver.inc(node.version, 'patch'));

mockUpdateChangelog.mockImplementation((pkg) => {
  const filePath = path.join(pkg.location, 'CHANGELOG.md');

  // grumble grumble re-implementing the implementation
  return fs.outputFile(filePath, 'changelog', 'utf8').then(() => ({
    logPath: filePath,
    newEntry: pkg.version ? `${pkg.name} - ${pkg.version}` : pkg.name,
  }));
});

exports.applyBuildMetadata = applyBuildMetadata;
exports.recommendVersion = mockRecommendVersion;
exports.updateChangelog = mockUpdateChangelog;
