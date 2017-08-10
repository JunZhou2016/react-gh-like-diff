import difflib from 'difflib';
import { format } from 'util';
import { Diff2Html } from 'diff2html';
import { compose } from 'recompose';

const defaultOptions = {
  originalFileName: 'Unknown-File-Name',
  updatedFileName: 'Unknown-File-Name',
  inputFormat: 'diff',
  outputFormat: 'line-by-line',
  showFiles: false,
  matching: 'words',
  matchWordsThreshold: 0.25,
  matchingMaxComparisons: 2500
};

const withErrorMessage = props => {
  const { past, current } = props;

  if (past === undefined || current === undefined) {
    const errorMessage = 'Missing `past` or `current` props!';
    throw errorMessage;
  }

  return props;
};

const gendDiff2Html = ({ past, current, options }) => {
  const nextOptions = Object.assign({}, defaultOptions, options);
  const pastArray = past.split('/\r|\n|\r\n');
  const currentArray = current.split('/\r|\n|\r\n');

  const diffArray = difflib.unifiedDiff(pastArray, currentArray, {
    fromFile: nextOptions.originalFileName,
    toFile: nextOptions.updatedFileName
  });

  const diffString = format(
    'diff --git %s %s\n%s',
    nextOptions.originalFileName,
    nextOptions.updatedFileName,
    diffArray.join('\n')
  );

  return Diff2Html.getPrettyHtml(diffString, options);
};

export default compose(genDiffString, withErrorMessage);
