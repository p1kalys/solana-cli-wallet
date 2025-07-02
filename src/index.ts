#!/usr/bin/env node

import { Command } from "commander";
import { airdrop, balance, clear, keygen, list, transfer } from "./commandController";

const program = new Command();

program.name('Solana CLI Wallet').description('A command line wallet for Solana').version('1.0.0');

program.command('keygen').description('Generate a new keypair').action(keygen);
program.command('list').description('List all the keypairs').action(list);
program.command('balance').description('gets the balance for the address in SOL').argument('<address>', 'the balance amount of SOL in the wallet').action(balance); 
program.command("airdrop").description("requests SOL from a faucet").argument("<address>", "the address that will recieve the SOL").argument("<amount>", "the airdrop amount to request in SOL").action(airdrop);
program.command('transfer').description('transfer SOL from one address to another').argument('<sender>', 'the sender address').argument('<receiver>', 'the receiver address').argument('<amount>', 'the amount of SOL to transfer').action(transfer);
program.command('clear').description('delete all the keypairs from wallet').action(clear);

program.parse();