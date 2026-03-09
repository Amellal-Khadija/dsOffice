(async () => {
  try {
    const res = await fetch('http://localhost:5174/src/App.css');
    console.log('STATUS:', res.status);
    const text = await res.text();
    process.stdout.write(text);
    console.log('\n---END---');
  } catch (e) {
    console.error('ERR', e);
    process.exit(1);
  }
})();
