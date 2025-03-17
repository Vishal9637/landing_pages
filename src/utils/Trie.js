class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let current = this.root;
      for (const char of word.toLowerCase()) {
        if (!current.children[char]) {
          current.children[char] = new TrieNode();
        }
        current = current.children[char];
      }
      current.isEndOfWord = true;
    }
  
    search(prefix) {
      prefix = prefix.toLowerCase();
      let current = this.root;
      for (const char of prefix) {
        if (!current.children[char]) {
          return [];
        }
        current = current.children[char];
      }
      const results = [];
      this.collectAllWords(current, prefix, results);
      return results;
    }
  
    collectAllWords(node, prefix, results) {
      if (node.isEndOfWord) {
        results.push(prefix);
      }
      for (const char in node.children) {
        this.collectAllWords(node.children[char], prefix + char, results);
      }
    }
  }
  
  export function buildTrie(words) {
    const trie = new Trie();
    words.forEach((word) => trie.insert(word));
    return trie;
  }
  